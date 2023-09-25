import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
  slugs: string[]
  component: QuartzComponent
  exclude?: boolean
}

function xor(a: boolean, b: boolean) {
  return (a || b) && !(a && b)
}

export default (({ slugs, component, exclude }: Options) => {
  // coerce
  const ex = exclude || false
  const Component = component
  function onlyOn(props: QuartzComponentProps) {
    const slugInList = slugs.includes(props.fileData.slug || "")
    if (xor(slugInList, ex)) {
      return <Component {...props} />
    } else {
      return <></>
    }
  }

  onlyOn.displayName = component.displayName
  onlyOn.afterDOMLoaded = component?.afterDOMLoaded
  onlyOn.beforeDOMLoaded = component?.beforeDOMLoaded
  onlyOn.css = component?.css
  return onlyOn
}) satisfies QuartzComponentConstructor
