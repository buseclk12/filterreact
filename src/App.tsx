import React, { useState } from 'react';

// Datasetler ve alt class'ları için TypeScript interfaces'i
interface IClass {
  name: string;
  classes?: IClass[];
}

interface IDataset {
  name: string;
  classes?: IClass[];
}

const datasets: IDataset[] = [
  {
    name: 'Polis',
    classes: [
      { name: 'eyp' },
      { name: 'myn'},
    ],
  },
  {
    name: 'Jandarma',
    classes: [
      { name: 'eyp' },
      { name: 'myn'},
      { name: 'bob'},
    ],
  },
];

// Recursive olarak kullanılacak Class bileşeni
const ClassComponent: React.FC<{ classItem: IClass }> = ({ classItem }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        {classItem.name}
      </label>
    </div>
  );
};

// Ana uygulama bileşeni
const App: React.FC = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Dataset checkbox'ının genişletilip genişletilmediğini kontrol etmek için bir fonksiyon
  const handleExpandChange = (datasetName: string) => {
    // Mevcut durumun tersini ayarla (genişletilmişse gizle, gizliyse genişlet)
    setExpanded(prev => ({ ...prev, [datasetName]: !prev[datasetName] }));
  };

  return (
    <div>
      {datasets.map((dataset, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              checked={expanded[dataset.name]}
              onChange={() => handleExpandChange(dataset.name)}
            />
            {dataset.name}
          </label>
          {expanded[dataset.name] && ( // Bu kontrol alt class'ların görünürlüğünü kontrol ediyor
            <div style={{ marginLeft: '20px' }}>
              {dataset.classes?.map((classItem, classIndex) => (
                <ClassComponent key={classIndex} classItem={classItem} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
