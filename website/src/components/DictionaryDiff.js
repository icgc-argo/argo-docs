import React from 'react';

function DictionaryDiff(props) {
  const { diff, high, low } = props;
  return (
    <div>
      {diff &&
        diff.map(entry => {
          return (
            <div>
              <h2>{entry[0]}</h2>
              <table>
                <tr>
                  <th>{high}</th>
                  <th>{low}</th>
                </tr>
                <tr>
                  <td>{JSON.stringify(entry[1].left)}</td>
                  <td>{JSON.stringify(entry[1].right)}</td>
                </tr>
              </table>
            </div>
          );
        })}
    </div>
  );
}

export default DictionaryDiff;
