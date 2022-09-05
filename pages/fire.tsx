const FireLinks = () => {
  return (
    <article>
      <h1>CA Fire Links</h1>
      <h2>Twit</h2>
      <ul>
        <li>
          <a href="https://twitter.com/CAL_FIRE">Cal FIRE twitter</a>. Probably
          the most up-to-date official info. A good starting place.
        </li>
        <li>
          <a href="https://twitter.com/CAFireScanner">CA Fire Scanner</a>. When
          active, has insanely high-quality up-to-date info.
        </li>
        <li>
          <a href="https://twitter.com/FirePhotoGirl">Fire Photo Girl</a>
        </li>
        <li>
          <a href="https://twitter.com/AlertWildfire">Alert Wildfire</a>
        </li>
      </ul>
      <h2>GIS Sources</h2>
      <ul>
        <li>
          <a href="https://www.arcgis.com/apps/webappviewer/index.html?id=6dc469279760492d802c7ba6db45ff0e&extent=-14239778.9738%2C4174930.3672%2C-12801539.8496%2C5048146.9784%2C102100&showLayers=mapNotes_7061%3BmapNotes_7061_3%3BmapNotes_7061_2%3BmapNotes_7061_1%3BmapNotes_7061_0%3Bsurvey123_bb6eda36d0804180a7546ca7ebf0c62b_stakeholder_7746%3BUSA_Wildfires_v1_6433%3BNOAA_METAR_current_wind_speed_direction_v1_6979%3BNWS_Watches_Warnings_v1_7134%3BUSA_Counties_Generalized_4172%3BUSA_Counties_9862%3BEDW_ForestSystemBoundaries_01_9139%3BNPS_Land_Resources_Division_Boundary_and_Tract_Data_Service_1557%3Bkml_3257_folder_0%3Bkml_3257_folder_1">
            FireMappers
          </a>
          . Aggregate, pulls from a lot of sources, completeness over accuracy.
          Has a ton of stuff. Make sure to turn on the layers you want.
        </li>
        <li>
          <a href="https://firms.modaps.eosdis.nasa.gov/map/#d:24hrs;@-118.5,37.2,6z">
            FIRMS
          </a>
          . Satellite data. ~24 hr lag, but it's easy to tell what's real. Can
          be shown on FireMappers.
        </li>
      </ul>
      <h2>Assorted Sites</h2>
      <ul>
        <li>
          <a href="https://www.alertwildfire.org/region/northbay/?camera=Axis-SEPopeValley1">
            Fire Cameras
          </a>{" "}
          (via AlertWildfire)
        </li>
        <li>
          <a href="https://www.fire.ca.gov/incidents/">Cal Fire Incidents</a>{" "}
          Official AF.
        </li>
      </ul>
    </article>
  );
};

export default FireLinks;
