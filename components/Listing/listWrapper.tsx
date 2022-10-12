import React, { SetStateAction, useEffect, useState } from "react";
import { PropertyProps } from "../../interfaces/main";
import { setProperty } from "../../store/actions/properties";
import PropertyCard from "../cards/propertyCard";
import HoMap from "../map/map";
import Styles from "./styles.module.scss";

export default function ListWrapper({
  properties,
  deleteProperty,
  searchTerm,
}: {
  properties: PropertyProps[];
  deleteProperty: (id: string) => void;
  searchTerm: string;
}) {
  const [searchProperty, setSerchProperty] = useState<PropertyProps[] | null>(
    null
  );
  useEffect(() => {
    if (searchTerm) {
      const findProperty = properties.find((props) => props.id === searchTerm);
      return setSerchProperty([findProperty] as PropertyProps[]);
    }
    setSerchProperty(null);
  }, [searchTerm]);

  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        {(searchProperty ?? properties)?.map((property) => (
          <PropertyCard
            key={property?.id}
            property={property}
            deleteProperty={deleteProperty}
          />
        ))}
      </div>
      <HoMap />
    </div>
  );
}
