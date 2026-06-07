### What?

<!-- Describe the change: new dataset, schema format, UI improvement, bug fix, etc. -->

### How to test?

<!-- Steps to verify. For datasets: key name and `?model=` URL. For schema: which format tab to check. -->

- [ ] `npm test` passes
- [ ] `npm run build` passes
- [ ] Tested in browser locally (if UI/data change)

### Dataset checklist (if adding mock data)

- [ ] Entry added to `src/data/manifest.json`
- [ ] JSON file in `src/data/datasets/` + loader in `jsonLoaders.ts`, **or** TS export + loader in `loaders.ts`
- [ ] `key`, `title`, `description`, `category`, and `tags` are set

### Screenshots (if UI changes)
