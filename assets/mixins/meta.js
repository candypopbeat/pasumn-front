export default {
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.description },
        { hid: 'og:title', property: 'og:title', content: this.title + ' | ' + process.env.title },
        { hid: 'og:description', property: 'og:description', content: this.description },
        { hid: 'og:url', property: 'og:url', content: process.env.baseUrl + this.$route.path },
      ],
    }
  },
};
