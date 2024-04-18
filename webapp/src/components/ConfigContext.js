import React, { createContext, useContext, useState } from 'react';

const ConfigContext = createContext();

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({ numQuestions: 10, timePerQuestion: 30 });

  const updateConfig = (newConfig) => {
    setConfig(newConfig);
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
