# Client Side Context Data

Some data, just `req.params` by default, is automatically made available to client side javascript through the global method `getContext()`.

## Usage

The most common usage, will be accessing `:param` data in client side event handlers. Below is an example showing how to fetch the `:space_id` param and build it into an api request path.
```js
const myEventHandler = async (event) => {
    // Instead of storeing/accessing `:param` data from elements.
    // const space_id = event.target.dataset.id;

    // We can pull it out of the globally provided "context" object, accessed via `getContext()`.
    // Get the space ID from global context.
    const { space_id } = getContext();

    try {
        const response = await fetch( `/api/space/${space_id}` );
        // response handling
    } catch(err) {
        // error handling
    }
}
```

## Extending `jsViewContext`: Adding more data to `getContext()`

To be written!

## FAQ

**Where does the `getContext()` come from?**

If you're looking for the function definition, you can find it's creation in the <head> of the main layout file in handlebars.

**How does it work?**

Middleware in the Express layer helps automatically provide a `jsViewContext` variable to handlebars views. `jsViewContext` is an object, currently just a match of `req.params` by default.

That object is printed as JSON in inside a `closure` where the `getContext` method is created.

Since this is done at the top of the page, for all of the views, `getContext()` becomes a globally accessible method from any client side js file linked within a view.