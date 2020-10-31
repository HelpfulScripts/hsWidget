/**
 * # Router
 * Implements a simple `Mithril` router.
 * 
 * ### Profile
 * invoked as `new Router(Component, routePattern, defaults)`:
 * - Component: a `Mithril` component
 * - routePattern: e.g. '/:menu/:year/:project'
 * - defaults: e.g.: 
 * ```
 * [['menu',     'Review'],
 *  ['year',     new Date().getFullYear()],
 *  ['project',  'none']
 * ]
 * ```
 * 
 */
/** */
import m            from "mithril";
import { Log }      from 'hsutil';  const log = new Log('Router');
import { Widget }   from '../Widget';


interface WidgetClass {
    new (): Widget;
}

/**
 * ## Router
 * A `Mithril` router with path attributes as defined by `T`.
 */
export class Router<T> {
    public lastAttrs = <T>{};

    /**
     * constructs a new `Router`.
     * @param viewComponent the component (extension of hsWidget.Widget) to instantiate when a route is matched
     * @param routePattern the routing URL pattern, e.g. '/:menu/:year/:project'
     * @param defaults default falues for the path attributes
     */
    constructor(viewComponent: WidgetClass, protected routePattern:string, protected defaults:T) { 
        this.setParts(<T>{}); 
        setTimeout(() => this.route(viewComponent, routePattern));  // initialize in next pass
    }

    /** 
     * sets the route according ot the provided `parts`. Missing parts will be completed from
     * previous settings stored in `this.lastAttrs`
     */
    public setRoute(attrs:T) {
        attrs = this.setParts(attrs);
        m.route.set(this.routePattern, attrs);
    }

    public redraw() {
        m.redraw();
    }

    /** 
     * Takes the provided `attrs`, completes missing attributes from `this.lastAttrs` and returns 
     * a full set of attributes.
     * Called as `const attrs = router.setParts(node.attrs);`
     */
    public setParts(attrs:T):T {
        Object.entries(this.defaults).map(([attr,def]:[string, any]) => {
            if (attrs[attr]===undefined /*|| attrs[attr]==='none'*/) { attrs[attr] = this.lastAttrs[attr]; }
            this.lastAttrs[attr] = attrs[attr] || this.lastAttrs[attr] || def;
        });
        return this.lastAttrs;
    }

    private route(viewComponent: WidgetClass, routePattern:string) {
        const parts = routePattern.split(':');
        const routes = {};
        let path = '';
        for (const part of parts) {
            path += (path===''? '' : ':') + part;
            routes[path] = viewComponent;
            log.info(`added route '${path}'`);
        }
        m.route(document.body, '/', routes)
    }
}

