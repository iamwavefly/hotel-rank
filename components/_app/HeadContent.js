const HeadContent = () => (
  <>
    <title>Listing - Hotel Ranking</title>
    <script
      defer
      src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API_KEY}&v=3&libraries=geometry,places`}
    ></script>
  </>
);

export default HeadContent;
