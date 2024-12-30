const Helper = {
  stripHtmlTags: (str: string) => {
    return str.replace(/<[^>]*>/g, "");
  },
};

export default Helper;
