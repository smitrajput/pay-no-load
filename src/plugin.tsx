import React from "react";
require('isomorphic-fetch');
import Contract from "./contract";

const plugin = {
    init(config:any, api:any, logger:any, publicPath:any) {
        __webpack_public_path__ = publicPath;

        // Add module, page definitions and others here
        api.addModuleDef("module://aleth.io/payts/profile", {
            // We don't use context for now, so it's an empty object
            contextType: {},
            dataAdapters: [],
            // The React component is loaded asynchronously and then cached by the CMS until a full page reload
            // It can either be a component class or a functional component
            getContentComponent: async () => (props:any) => {
            return (
            <div>Hello, {props.name}!
            <form>
            <label>
                Contract Address:
                <input type="text" name="name" onChange={(event)=>{this.http('https://api.aleth.io/v1/contracts/0x2af47a65da8CD66729b4209C22017d6A5C2d2400/token')}}/>
            </label>
            <input type="submit" value="Submit"/>
            </form>
            <Contract />
            </div>
            )
            }

            // getContentComponent: async () => (props) => console.log('hi')
            ,
            // We receive some props from the cms and we map them to the props that our component needs
            getContentProps: (cmsProps:any) => ({ name: "Joe" })
        });

        api.addPageDef("page://aleth.io/payts/profile-page", {
            contextType: {},
            paths: {
                // We'll map the page to an application path. The left-hand side is a react-router path expression.
                // The right hand side receives params extracted from the path expression and
                // resolves to an empty context object, which we won't use for now
                "/profile": (params:any) => ({})
            },
            // Function that resolves to a React component class/ functional component. It can also be async.
            getPageTemplate: () => ({ slots }) => <div>
            <h1>User profile</h1>
            { /* We'll define a single named slot ("content"), where the CMS will inject our module */ }
            { slots && slots["content"] }
        </div>
            // getPageTemplate: () => ({ slots }) => console.log('bye')
        });
    },

    getAvailableLocales() {
        return ["en-US"];
    },

    async http(request: RequestInfo): Promise<any> {
        return new Promise(async resolve => {
          let data = await fetch(request, {
              method: 'GET',
              headers: {
                  'username':'main_k5ua5idae7skpuciub5afanpxys3q',
              }
          })
          console.log(await data.json());
            // .then(response => console.log(response.json()))
            // .then(body => {
            //   resolve(body);
            // });

        });
      },

    async loadTranslations(locale:any) {
        return await import("./translation/" + locale + ".json");
    }
};

export default plugin;
