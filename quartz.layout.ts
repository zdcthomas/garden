import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"
function recentDir(dir: string, title: string) {
  return Component.RecentNotes({
    title,
    limit: 1,
    filter: (f) =>
      f.slug!.startsWith(`${dir}/`) && f.slug! !== `${dir}/index` && !f.frontmatter?.noindex,
    linkToMore: `${dir}/` as SimpleSlug,
  })
}
const yak_shed = recentDir("tales_from_the_yak_shed", "Tales From the Yak Shed")
const blog = recentDir("blog", "Blog")
const notes = recentDir("notes", "My Personal Wiki")

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.onlyOn({
      slugs: ["index"],
      component: Component.ArticleTitle(),
    }),
    Component.onlyOn({
      slugs: ["index"],
      component: yak_shed,
    }),

    Component.onlyOn({
      slugs: ["index"],
      component: blog,
    }),
    Component.onlyOn({
      slugs: ["index"],
      component: notes,
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/zdcthomas",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.onlyOn({
      slugs: ["index"],
      component: Component.ArticleTitle(),
      exclude: true,
    }),
    Component.ContentMeta(),
    Component.TagList(),
    Component.TableOfContents(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
      Component.onlyOn({
        slugs: ["index"],
        component: Component.Explorer(),
      }),
    ),
    Component.DesktopOnly(
      Component.onlyOn({
        slugs: ["index"],
        component: yak_shed,
        exclude: true,
      }),
    ),
    Component.DesktopOnly(
      Component.onlyOn({
        slugs: ["index"],
        component: blog,
        exclude: true,
      }),
    ),
  ],
  right: [
    Component.Graph({
      localGraph: {
        drag: true, // whether to allow panning the view around
        zoom: true, // whether to allow zooming in and out
        depth: 3, // how many hops of notes to display
        scale: 1.1, // default view scale
        repelForce: 0.5, // how much nodes should repel each other
        centerForce: 0.3, // how much force to use when trying to center the nodes
        linkDistance: 30, // how long should the links be by default?
        fontSize: 0.6, // what size should the node labels be?
        opacityScale: 1, // how quickly do we fade out the labels when zooming out?
      },
      globalGraph: {
        drag: true,
        zoom: true,
        depth: -1,
        scale: 0.9,
        repelForce: 0.5,
        centerForce: 0.3,
        linkDistance: 30,
        fontSize: 0.6,
        opacityScale: 1,
      },
    }),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Tales From the Yak Shed",
        limit: 1,
        filter: (f) => f.slug!.startsWith("tales_from_the_yak_shed/"),
        linkToMore: "tales_from_the_yak_shed/" as SimpleSlug,
      }),
    ),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Recent Writing",
        limit: 1,
        filter: (f) =>
          f.slug!.startsWith("blog/") && f.slug! !== "blog/index" && !f.frontmatter?.noindex,
        linkToMore: "blog/" as SimpleSlug,
      }),
    ),
  ],
  right: [
    Component.Graph({
      localGraph: {
        drag: true, // whether to allow panning the view around
        zoom: true, // whether to allow zooming in and out
        depth: 4, // how many hops of notes to display
        scale: 1.1, // default view scale
        repelForce: 0.5, // how much nodes should repel each other
        centerForce: 0.3, // how much force to use when trying to center the nodes
        linkDistance: 30, // how long should the links be by default?
        fontSize: 0.6, // what size should the node labels be?
        opacityScale: 1, // how quickly do we fade out the labels when zooming out?
      },
      globalGraph: {
        drag: true,
        zoom: true,
        depth: -1,
        scale: 0.9,
        repelForce: 0.5,
        centerForce: 0.3,
        linkDistance: 30,
        fontSize: 0.6,
        opacityScale: 1,
      },
    }),
  ],
}
