```
yarn install
yarn babel-node src/index.js
```

# Idea

Writing GraphQL schema definition using POJOs is not very nice. It would be great to be able to write it like this:

```js
const AllowedBaggage = async () => {
  const data = await dataSource();
  return <>
    <GraphQLID />
    <GraphQLString value={data.whatever} />
  </>
};

const Schema = () => (
  <>
    <RootQuery>
      <AllBookings>
        <GraphQLID />
        <GraphQLString name="status" description="..." value="ok" />
        <AllowedBaggage />
      </AllBookings>
      <AllFlights />
      <AllHotels />
    </RootQuery>
    <RootMutation />
  </>
);
```

This basically defines root queries with output types.

- https://github.com/facebook/react/blob/master/packages/react-dom/src/client/ReactDOM.js
- https://github.com/nitin42/Making-a-custom-React-renderer
