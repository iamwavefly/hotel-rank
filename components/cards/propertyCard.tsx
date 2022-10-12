import React, { useEffect } from "react";
import { IconButton } from "@mui/material";
import { TrashCan, Pen, Clean, Swim, Hotel } from "@carbon/icons-react";
import { connect } from "react-redux";
import Styles from "./styles.module.scss";
import { AppProps, GeocodeProps, PropertyProps } from "../../interfaces/main";
import { editProperty, updateGeocode } from "../../store/actions/app";
import { ContentEditProps } from "../../interfaces/main";

interface CardProps {
  property: PropertyProps;
  searchTerm: string;
  deleteProperty: (id: string) => void;
  editProperty: (arg0: ContentEditProps) => void;
  updateGeocode: (arg0: GeocodeProps) => void;
}

const PropertyCard = ({
  property,
  deleteProperty,
  editProperty,
  updateGeocode,
}: CardProps) => {
  const {
    id,
    address,
    age,
    city,
    country,
    date,
    discount,
    name,
    parking,
    price,
    rooms,
    tag,
    toilets,
    type,
    geocode,
  } = property;

  const editPropHandler = () => {
    editProperty({ id, init: true });
  };

  return (
    <div
      className={Styles.container}
      onClick={() => updateGeocode(geocode as GeocodeProps)}
    >
      <div className={`${Styles.tag} ${Styles[tag]}`}>{tag}</div>
      <section className={Styles.imgWrapper}>
        <img src="https://nairametrics.com/wp-content/uploads/2021/05/Real-Estate-2.jpg" />
      </section>
      <section className={Styles.content}>
        <div className={Styles.bookmark}>
          <span>Discount {discount}%</span>
          <div>
            <IconButton onClick={editPropHandler}>
              <Pen color="#222831" size={16} />
            </IconButton>
            <IconButton onClick={() => deleteProperty(id)}>
              <TrashCan color="#a70023" size={16} />
            </IconButton>
          </div>
        </div>
        <div className={Styles.title}>
          <div className={Styles.location}>
            <h3>{name.length > 15 ? name.substring(0, 15) + "..." : name}</h3>
            <span>
              {city}, {country}.
            </span>
          </div>
          <div className={Styles.price}>
            <label className={Styles.type}>{type}</label>
            <div>
              <h3>${price}</h3>
              <span>${price}</span>
            </div>
          </div>
        </div>
        <div className={Styles.properties}>
          <div>
            <span>{toilets}</span>
            <Clean />
          </div>
          <div>
            <span>{}</span>
            <Swim />
          </div>
          <div>
            <span>{rooms}</span>
            <Hotel />
          </div>
          <div>
            <span>Built: </span>
            <span>{age}</span>
          </div>
          <div>
            <span>Parking: </span>
            <span>{parking}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

interface StateProps {
  app: AppProps;
}

export default connect(
  (state: StateProps) => ({
    searchTerm: state.app.searchText,
  }),
  { editProperty, updateGeocode }
)(PropertyCard);
