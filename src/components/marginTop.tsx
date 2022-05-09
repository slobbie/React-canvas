import React from 'react';

export interface MarginModel {
  margin: number;
}

const MarginTop = (props: MarginModel) => {
  return (
    <>
      <div style={{ marginTop: props.margin }} />
    </>
  );
};

export default MarginTop;
