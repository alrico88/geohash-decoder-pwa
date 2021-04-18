<template lang="pug">
#app
  router-view.safe
  van-tabbar(route="")
    van-tabbar-item(replace="", to="/", icon="location-o")
      | Decode
    van-tabbar-item(replace="", to="/encode", icon="aim")
      | Encode
    van-tabbar-item(replace="", to="/position", icon="location-o")
      | My location
    van-tabbar-item(replace="", to="/options", icon="setting-o")
      | Options
</template>
