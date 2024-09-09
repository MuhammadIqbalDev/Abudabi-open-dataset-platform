import React, { memo } from "react";
import ChangeComponent from "../../../components/modules/Authentication/ChangePassword";
import View from "../../../components/modules/View";

const ChangePassword = memo(() => {

  return (
    <View theme={"dark"} nocontent noupperfooter nomiddlefooter nolowerfooter>
      <ChangeComponent />
    </View>
  )

});

export default ChangePassword;
