export type ImportComponentsParams = APIbuilderData[]

export interface APIbuilderData {
  collection: 'string',
  item: 'string'
}

export let importComponents = async function getComponents(components: ImportComponentsParams) {
  return await components.map(async (component: APIbuilderData) => {
    const props = component.item
    let toRender = await import(
      `../components/builder/${props.slug}.astro`
    );

    return {
      Component: toRender.default,
      props: props
    };
  });
};
