import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="137" cy="126" r="125" /> 
    <rect x="0" y="269" rx="10" ry="10" width="280" height="30" /> 
    <rect x="0" y="320" rx="10" ry="10" width="280" height="88" /> 
    <rect x="1" y="436" rx="10" ry="10" width="95" height="30" /> 
    <rect x="130" y="428" rx="25" ry="25" width="145" height="50" />
  </ContentLoader>
);

export default Skeleton;
