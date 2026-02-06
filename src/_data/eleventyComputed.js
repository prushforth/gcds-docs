module.exports = {
  links: data => {
    const pathPrefix = process.env.PATH_PREFIX || '';
    
    // Merge linkOverrides into links (linkOverrides are defined in local data files
    // to override specific link values without breaking the PATH_PREFIX computation)
    let links = data.links || {};
    if (data.linkOverrides) {
      links = { ...links, ...data.linkOverrides };
    }
    
    if (!links || pathPrefix === '') {
      return links;
    }

    // Recursively prefix all string values that start with "/"
    const prefixUrls = (obj) => {
      if (typeof obj === 'string' && obj.startsWith('/')) {
        // Don't prefix URLs that are already prefixed or external
        if (obj.startsWith('//') || obj.startsWith('http')) {
          return obj;
        }
        return `${pathPrefix}${obj}`;
      }
      
      if (typeof obj === 'object' && obj !== null) {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
          result[key] = prefixUrls(value);
        }
        return result;
      }
      
      return obj;
    };

    return prefixUrls(links);
  }
};
