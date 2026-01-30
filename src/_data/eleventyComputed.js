module.exports = {
  links: data => {
    const pathPrefix = process.env.PATH_PREFIX || '';
    
    if (!data.links || pathPrefix === '') {
      return data.links;
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

    return prefixUrls(data.links);
  }
};
