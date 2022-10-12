import { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Divider,
  List,
  ListItem,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Styles from "./styles.module.scss";
import { NewPropertySchema } from "../../validation/form/formSchema";
import {
  AppProps,
  PropertyProps,
  ContentEditProps,
} from "../../interfaces/main";
import axios from "axios";

const tags = [
  { id: 1, name: "Limited" },
  { id: 2, name: "Exclusive" },
  { id: 3, name: "New House" },
];

const propTypes = [
  { id: 1, name: "Apartment" },
  { id: 2, name: "Land" },
  { id: 3, name: "Parking" },
];

interface drawelProps {
  app: AppProps;
  properties: PropertyProps[];
  updateProperty: (PropertyProps: PropertyProps) => void;
  toggleDrawer: () => void;
  deleteProperty: (id: string) => void;
}

export default function NewPropertyDrawer({
  app,
  properties,
  updateProperty,
  toggleDrawer,
  deleteProperty,
}: drawelProps) {
  const [loading, setLoading] = useState(false);
  const [geocode, setGeocode] = useState<any>(null);
  const [editContent, setEditContent] = useState<ContentEditProps>({
    id: "",
    init: false,
  });
  const [location, setLocation] = useState<any>({
    address: "",
    state_id: 0,
    country_id: 0,
  });

  const { drawalOpen, onContentEdit } = app;

  // ----- Hooks ----- //
  useEffect(() => {
    setEditContent(onContentEdit);
  }, [onContentEdit]);

  useEffect(() => {
    const { id, init } = editContent ?? {};
    if (init) {
      toggleDrawer();
      const property = properties.find((prop) => prop.id === id);
      formik.setValues(property as PropertyProps);
    }
  }, [editContent]);

  useEffect(() => {
    geocode?.lat && updateAddress(geocode);
  }, [geocode]);

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      address: "",
      city: "",
      country: "",
      tag: "",
      type: "",
      price: 0,
      discount: 0,
      rooms: 0,
      toilets: 0,
      age: 0,
      parking: "",
    },
    validationSchema: NewPropertySchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setTimeout(() => {
        deleteProperty(values?.id);
        updateProperty({
          ...values,
          date: new Date(),
          geocode,
          id: uuid(),
        });
        setLoading(false);
        toggleDrawer();
        resetForm();
      }, 3000);
    },
  });

  // address autocomplete
  const autoCompleteAddresses = (address: any) => {
    setLocation((prev: any) => ({ ...prev, address }));
    formik.values.address = address;

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setGeocode({ lat: latLng?.lat, lng: latLng?.lng }))
      .catch((error) => console.error("Error", error));
  };

  const updateAddress = async ({ lat, lng }: any) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
      const response = await axios.get(url);
      const { address } = response?.data;
      const { state, city, suburb, postcode, country_code, country } = address;
      formik.setFieldValue("city", city);
      formik.setFieldValue("country", country);
    } catch (error) {
    } finally {
    }
  };

  return (
    <Drawer anchor="right" open={drawalOpen} onClose={toggleDrawer}>
      <form onSubmit={formik.handleSubmit} className={Styles.container}>
        <header className={Styles.header}>
          <Typography component="h2">
            {editContent?.init ? "Update Property" : "List Your Property"}
          </Typography>
        </header>
        <Divider />
        <Stack sx={{ mt: "26px" }} gap={2}>
          <TextField
            label="Property Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <PlacesAutocomplete
            value={location.address}
            onChange={autoCompleteAddresses}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div style={{ position: "relative" }}>
                <TextField
                  {...getInputProps({
                    placeholder: "123 Johnson street...",
                    label: "Address",
                    onblur: formik.handleBlur,
                    name: "address",
                    error:
                      formik.touched.address && Boolean(formik.errors.address),
                    helperText: formik.touched.address && formik.errors.address,
                  })}
                />
                {suggestions.length ? (
                  <Grid className="suggestions-box">
                    {loading && <div>Loading...</div>}
                    {suggestions?.map((suggestion) => {
                      return (
                        <div
                          className="suggestion-item"
                          {...getSuggestionItemProps(suggestion, {})}
                          key={suggestion.id}
                        >
                          {suggestion?.description?.length > 60
                            ? suggestion?.description?.substring(0, 60) + "..."
                            : suggestion?.description}
                        </div>
                      );
                    })}
                  </Grid>
                ) : (
                  ""
                )}
              </div>
            )}
          </PlacesAutocomplete>
          <Stack direction="row" gap={2}>
            <TextField
              label="City"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="city"
              value={formik.values.city}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
            <TextField
              label="Country"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="country"
              value={formik.values.country}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Stack>
          <TextField
            label="Property Tag"
            select
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="tag"
            value={formik.values.tag}
            error={formik.touched.tag && Boolean(formik.errors.tag)}
            helperText={formik.touched.tag && formik.errors.tag}
          >
            {tags?.map((tag) => (
              <MenuItem key={tag?.id} value={tag?.name?.toLowerCase()}>
                {tag?.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Property Type"
            select
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="type"
            value={formik.values.type}
            error={formik.touched.type && Boolean(formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
          >
            {propTypes?.map((prop) => (
              <MenuItem key={prop?.id} value={prop?.name}>
                {prop?.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Price"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="price"
            value={formik.values.price}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            label="Discount"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="discount"
            value={formik.values.discount}
            error={formik.touched.discount && Boolean(formik.errors.discount)}
            helperText={formik.touched.discount && formik.errors.discount}
          />
          <TextField
            label="Rooms"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="rooms"
            value={formik.values.rooms}
            error={formik.touched.rooms && Boolean(formik.errors.rooms)}
            helperText={formik.touched.rooms && formik.errors.rooms}
          />
          <TextField
            label="Toilets"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="toilets"
            value={formik.values.toilets}
            error={formik.touched.toilets && Boolean(formik.errors.toilets)}
            helperText={formik.touched.toilets && formik.errors.toilets}
          />
          <TextField
            label="Property Age"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="age"
            value={formik.values.age}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
          />
          <TextField
            label="Parking"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="parking"
            value={formik.values.parking}
            error={formik.touched.parking && Boolean(formik.errors.parking)}
            helperText={formik.touched.parking && formik.errors.parking}
          />
          <LoadingButton
            sx={{ my: "16px" }}
            variant="contained"
            type="submit"
            loading={loading}
            disabled={!(formik.isValid && formik.dirty)}
          >
            {editContent?.init ? "Update Property" : "Submit Property"}
          </LoadingButton>
        </Stack>
      </form>
    </Drawer>
  );
}
