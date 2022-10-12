import React, { ReactNode } from "react";
import { connect } from "react-redux";
import MainHeader from "../../components/header/main/mainHeader";
import MainSidebar from "../../components/sidebar/mainSidebar";
import { toggleDrawer } from "../../store/actions/app";
import { AppProps, PropertyProps } from "../../interfaces/main";
import Styles from "./styles.module.scss";
import Head from "next/head";
import { useLoadScript } from "@react-google-maps/api";
import NoContent from "../../components/placeholder/noContent";

interface LayoutProps {
  children: ReactNode;
  toggleDrawer: () => void;
  properties: PropertyProps[];
}

const MainLayout = ({ children, toggleDrawer, properties }: LayoutProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY as string, // Add your API key
  });

  if (!isLoaded) {
    return <div>loading</div>;
  }
  return (
    <>
      <Head>
        <script
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API_KEY}&v=3&libraries=geometry,places`}
        ></script>
      </Head>
      <div className={Styles.container}>
        <MainSidebar />
        <MainHeader toggleDrawer={toggleDrawer} />
        <main className={Styles.content}>
          {!properties.length || !properties[0].name.length ? (
            <NoContent />
          ) : (
            children
          )}
        </main>
      </div>
    </>
  );
};

interface StateProps {
  app: AppProps;
  properties: PropertyProps[];
}

export default connect(
  (state: StateProps) => ({
    drawalOpen: state.app.drawalOpen,
    properties: state.properties,
  }),
  { toggleDrawer }
)(MainLayout);
