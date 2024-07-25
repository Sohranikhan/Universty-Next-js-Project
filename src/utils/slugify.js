const slugify =(str)=>
    {
        str = str.toLowerCase();
        str = str.replace(/[^a-z0-9]+/g, '-');
        str = str.replace(/^-+|-+$/g, '');
        return str;
      }
  export default slugify