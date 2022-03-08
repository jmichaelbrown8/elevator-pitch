# Client Side Context Data

Some data, just `req.params` by default, is automatically made available to client side javascript through the global method `getContext()`.

## Usage
```js
const myEventHandler = async (event) => {
    // We no longer needed to store/access the :param data from elements
    // const space_id = event.target.dataset.id;

    // Instead, we can pull it out of my newly provided "context" object, accessed via `getContext()`.
    // Get the space ID from global context.
    const { space_id } = getContext();
}
```

## FAQ

**Where does the `getContext()` come from?**

If you're looking for the function definition, you can find it's creation in the <head> of the main layout file in handlebars.

**How does it work?**

Middleware in the Express layer helps automatically provide a `jsViewContext` variable to handlebars views. `jsViewContext` is an object, currently just a match of `req.params` by default.

That object is printed as JSON in inside a `closure` where the `getContext` method is created.

Since this is done at the top of the page, for all the views, the `getContext` method becomes global method accessible from any view js file.