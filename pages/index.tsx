import type { NextPage } from "next";
import Head from "next/head";
import styles from ".";
import ListWrapper from "../components/Listing/listWrapper";
import MainLayout from "../layouts/main/mainLayout";
import { connect } from "react-redux";
import { useEffect } from "react";
import { AppProps, ContentEditProps, PropertyProps } from "../interfaces/main";
import { setProperty, deleteProperty } from "../store/actions/properties";
import { toggleDrawer, editProperty } from "../store/actions/app";
import NewPropertyDrawer from "../components/drawer/newPropertyDrawer";

interface HomePageProps {
  properties: PropertyProps[];
  app: AppProps;
  setProperty: (PropertyProps: PropertyProps) => void;
  editProperty: (PropertyProps: ContentEditProps) => void;
  deleteProperty: (id: string) => void;
  toggleDrawer: () => void;
}

const Home = ({
  properties,
  setProperty,
  deleteProperty,
  toggleDrawer,
  editProperty,
  app,
}: HomePageProps) => {
  return (
    <div>
      <Head>
        <title>Listing - Hotel Ranking</title>
      </Head>
      <MainLayout>
        <ListWrapper
          searchTerm={app.searchText}
          properties={properties}
          deleteProperty={deleteProperty}
        />
      </MainLayout>
      <NewPropertyDrawer
        updateProperty={setProperty}
        deleteProperty={deleteProperty}
        properties={properties}
        toggleDrawer={toggleDrawer}
        editProperty={editProperty}
        app={app}
      />
    </div>
  );
};

interface StateProps {
  properties: PropertyProps[];
  app: AppProps;
}

export default connect(
  (state: StateProps) => ({
    properties: state.properties,
    app: state.app,
  }),
  { setProperty, toggleDrawer, deleteProperty, editProperty }
)(Home);
