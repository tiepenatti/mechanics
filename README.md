# mechanics.

A workshop companion proof of concept, starting with the 2023 Tesla Model 3. The React app offers a searchable vehicle library, service-topic search, links to Tesla's service manual, and an interactive conceptual 3D illustration with selectable and exploded layers. It is designed to work on a workshop tablet as well as a desktop.

**Not a repair reference:** the model is a generic illustration, not Tesla geometry, and its layers do not represent actual component locations. Service topics are navigation aids, not instructions. No bulb specification, screw sequence, torque, diagnostic port, wiring detail, or reassembly procedure has been verified or supplied. Always identify the exact vehicle and follow the current official service information and safety warnings, particularly for high-voltage systems.

## Run locally

Requires Node.js 20.19+ or 22.12+ (or a current Bun release).

```sh
npm ci
npm run dev
npm run lint
npm run build
```

With Bun, use `bun install` and `bun run dev`, `bun run lint`, or `bun run build`. The committed npm lockfile is the reproducible dependency source; Bun can run the same scripts. The 3D viewer requires WebGL and provides a fallback when unavailable.

## Deploy and next steps

Import the repository into Vercel using the Vite preset. The build command is `npm run build` and the output directory is `dist`. The current app is static and needs no environment variables. Check Vercel's current free-plan limits and terms before relying on it commercially.

This is **not yet a subscription application**: there is no backend, Neon database, Neon Auth, payment processing, access control, persistent recent-vehicle history, or AI update pipeline. Do not deploy it as a production service or store customer data in it. The intended next step is a Bun-based Vercel Functions API with Neon Postgres and [Neon Auth](https://neon.com/docs/auth/quick-start/react); validate sessions and enforce tenant access on the server, keep database credentials server-side, and implement billing/webhook verification before charging users. The Neon JS beta dependency was evaluated but not included because its dependency tree reported critical/high advisories at implementation time; re-evaluate patched releases before integration. See [Vercel's Bun runtime documentation](https://vercel.com/docs/functions/runtimes/bun).

## Vehicle information research

Tesla Model 3 is the starting point because Tesla provides a comparatively accessible public service portal with a service manual, parts catalog and wiring information. It is an EV, so this first vehicle has no fuel system. Model year, market, production date and vehicle configuration matter; “2023 Model 3” alone is not enough to determine a procedure or part. Tesla documentation can change independently of this app.

| Source | Brands / information | Access and limitations |
| --- | --- | --- |
| [Tesla Service Portal](https://service.tesla.com/) and [Tesla portal overview](https://www.tesla.com/support/service-portal) | Tesla service manuals, diagnostics, wiring diagrams and parts catalog; includes Model 3. | Viewing service information is available through the portal; some tools, software and functions require account, subscription or other access. Consult Tesla for current conditions. |
| [Model 3 service manual](https://service.tesla.com/docs/Model3/ServiceManual/en-us/) | Official procedures, safety information, component removal and installation for Model 3. | Select the applicable vehicle/configuration and confirm the current revision; a link is not permission to redistribute content. |
| [Cabin filter service procedure](https://service.tesla.com/docs/Model3/ServiceManual/en-us/GUID-2362856A-79BC-49A9-B11C-3B0E68EFF276.html) / [owner DIY guide](https://service.tesla.com/docs/Public/diy/model3/en_us/GUID-DB0A1E3C-926E-498C-A2FD-A27B8421A471.html) | Tesla's professional and owner-oriented Model 3 cabin-filter information. | Verify applicability, build-specific differences and current warnings before use. |
| [Tesla parts catalog](https://epc.tesla.com/) | Tesla parts illustrations and catalog information by model. | Availability and purchasing vary by region; illustrations are not necessarily reusable 3D assets. |
| [Toyota/Lexus technical information](https://techinfo.toyota.com/) | Toyota, Lexus and Scion repair information, diagnostics, wiring and technical bulletins. | U.S. portal; subscription and registration may be required. |
| [Honda Service Express](https://techinfo.honda.com/) | Honda and Acura service information, electrical diagrams and bulletins. | U.S. portal; access terms and subscriptions vary by product. |
| [Motorcraft Service](https://www.motorcraftservice.com/) | Ford and Lincoln service information, diagnostics and programming resources. | U.S. portal; registration, subscription and equipment may be required. |
| [BMW technical information](https://www.bmwtechinfo.com/) | BMW and MINI repair information and diagnostic resources. | U.S. portal; subscription and access requirements vary. |
| [Ford Pro upfitter CAD](https://www.fordpro.com/en-us/upfit/cad/) | Ford vehicle CAD for upfitting. | Investigate availability and reuse rights; upfitter geometry is not necessarily repair-grade component data. |
| [Volkswagen erWin](https://erwin.vw.com/erwin/showHome.do) / [Audi erWin](https://erwin.audiusa.com/) | Volkswagen and Audi factory repair information, wiring and diagnostic resources. | U.S. portals; paid access and registration may be required. |
| [NASTF](https://www.nastf.org/) and [OEM1Stop](https://www.oem1stop.com/) | Multi-brand directories and, for NASTF, independent-repair and security credentialing resources. | Directories, not a license to reproduce OEM content; security-sensitive operations may require credentials. |
| [NHTSA](https://www.nhtsa.gov/recalls) | U.S. vehicle recalls and safety information across brands, searchable by VIN. | Useful safety context, not a replacement for the manufacturer's repair manual. |

Availability, coverage, price and terms vary by region and change over time. Direct access to the OEM sites could not be verified from the development environment; check current access and applicability before relying on these links. Publicly viewable does **not** mean reusable: obtain explicit rights for ingestion, redistribution, AI processing, images, diagrams and any manufacturer 3D/CAD models. No source identified here grants those rights by default, and no reusable repair-grade Model 3 CAD was verified.

## Specification for future data work

Before showing an actual procedure, store its OEM source URL, publication/revision date, market and precise vehicle applicability; require human verification and a refresh/review process. Model each step in order with safety prerequisites, tools, parts, fasteners, units and torque, including explicit reassembly instructions rather than automatically reversing removal. Associate each step with licensed, configuration-specific 3D assets and component identifiers. Treat unavailable or unverified values as unknown, never generate them. Diagnostics, electrical diagrams and ports need the same provenance and review. Estimates, quotes, accounts, subscriptions and AI-assisted updates are future features, not implemented in this preview.
