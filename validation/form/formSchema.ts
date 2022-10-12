import { object, string, number } from "yup";

export const NewPropertySchema = () =>
  object({
    name: string().required("Property name is required"),
    address: string().required("Address is required"),
    city: string().required("City is required"),
    country: string().required("Country is required"),
    tag: string().required("Tag is required"),
    type: string().required("Type is required"),
    price: number().required("Price is required"),
    discount: number().required("Discount is required"),
    rooms: number().required("Rooms is required"),
    toilets: number().required("Toilets is required"),
    age: number().required("Age is required"),
    parking: string().required("Parking is required"),
  });
