import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={5}
    width={1140}
    height={1600}
    viewBox="0 0 1140 1600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="53" rx="3" ry="3" width="599" height="9" /> 
    <rect x="3" y="70" rx="3" ry="3" width="599" height="1580" />
  </ContentLoader>
)

export default MyLoader