# iCONECT Candidate Questionnaire

File upload web application

## Demo:

(File upload web app)[https://benjdg16dev-iconect-file-upload.onrender.com]

## Screenshots:

![No files uploaded]("")
![Choosing a file]("")
![Custodian input]("")
![Upload succses]("")
![Selecting multiple files]("")
![Loading]("")

## Steps to run locally

1. Clone
2. `npm i`
3. `npm run start`
4. Clone [server](https://github.com/benjdg16dev/iconect-server)
5. On server folder run `npm i`
6. On server folder run `npm run start` or `npm run server`
7. Upload files on [client](http://localhost:3000)

## Assumptions

- Custodian is a text input for a batch.

## Stories

### Must have

User must be able to...

- [x] see UI/UX
- [x] select and upload a file
- [x] drag and drop a file
- [x] choose multiple files
- [x] see the custodian input
- [x] type the custodian's name
- [x] submit the file/s
- [x] notify that it is uploading via loader
- [x] upload simultaneously
- [ ] have 'mocked' timer functionality

### Shoud have

- [x] see responsive web design
- [ ] have a11y
- [x] have some error handlings

### Could have

- [x] upload to a server

### Would have

- [x] see different icons for different files

### Others

- [ ] Optimization using `React.memo`

## Difficulties

- Drag event

  - I used `dragOver` with `e.preventDefault()` and `e.stopPropagation` to make drop event work
  - https://stackoverflow.com/questions/50230048/react-ondrop-is-not-firing

- Simultaneous upload

  - Restructured application to pass the state to parent (avoiding large state managements).
  - Called API inside `useEffect` to avoid re-rendering since the states are always changing.

- Deployment
  - Separated client & server
