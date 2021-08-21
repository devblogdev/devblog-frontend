import React from 'react';
// import { Map } from 'immutable'


// based on Draft.js' custom list depth styling
const ORDERED_LIST_TYPES = ['1', 'a', 'i'];

const defaultBlockHTML = {
  unstyled: <p />,
  paragraph: <p />,
  'header-one': {
    element: 'h1'
  },
  'header-two': {
    element: 'h2'
  },
  'header-three': {
    element: 'h3'
  },
  'header-four': {
    element: 'h4'
  },
  'header-five': {
    element: 'h5'
  },
  'header-six': {
    element: 'h6'
  },
  'code-block': <pre />,
  blockquote: <blockquote />,
  'unordered-list-item': {
    element: <li />,
    nest: <ul />,
  },
  'ordered-list-item': {
    element: <li />,
    nest: depth => {
      const type = ORDERED_LIST_TYPES[depth % 3];
      return <ol type={type} />;
    },
  },
  media: <figure />,
  atomic: <figure />,
}

// export default defaultBlockHTML