exports.success = (message, results) => {
    return {
      success: true,
      message,
      data: results,
    };
  };