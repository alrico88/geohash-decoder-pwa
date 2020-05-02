<template>
  <div id="app">
    <router-view class="safe" />
    <van-tabbar route>
      <van-tabbar-item
        replace
        to="/"
        icon="location-o"
      >
        Decode
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/encode"
        icon="aim"
      >
        Encode
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/position"
        icon="location-o"
      >
        My location
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss">
body {
  background-color: #f7f8fa;
}

.safe {
  padding-bottom: 70px;
}

.block-title {
  margin: 0;
  padding: 16px 16px 16px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
}
</style>
