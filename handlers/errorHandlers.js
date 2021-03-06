// Catch Errors Handler for async/await
exports.catchErrors = (fn) =>
  function (req, res, next) {
    return fn(req, res, next).catch(next);
  };

// Not Found Error Handler: mark it as 404 and pass it along to the next error handler to display
exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

// MongoDB Validation Error Handler: Detect if there are mongodb validation errors and show in flash messages
exports.flashValidationErrors = (err, req, res, next) => {
  if (!err.errors) return next(err);
  // validation errors look like
  const errorKeys = Object.keys(err.errors);
  errorKeys.forEach((key) => req.flash('error', err.errors[key].message));
  res.redirect('back');
};

// Development Error Handler: Show good error messages on what happened
exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    title: `Error ${err.status}`,
    status: err.status,
    message: err.message,
    stackHighlighted: err.stack.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      '<mark>$&</mark>'
    ),
  };
  res.status(err.status || 500);
  res.format({
    // Based on the `Accept` http header
    'text/html': () => {
      res.render('error', errorDetails);
    }, // Form Submit, Reload the page
    'application/json': () => res.json(errorDetails), // Ajax call, send JSON back
  });
};

// Production Error Handler: No stacktraces are leaked to user
exports.productionErrors = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status);
  res.render('error', {
    title: `Error ${status}`,
    status,
    message: err.message,
    error: {},
  });
};
