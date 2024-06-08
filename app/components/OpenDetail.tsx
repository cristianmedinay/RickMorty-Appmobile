import React, {Fragment} from 'react';
import {Linking, ListRenderItem, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const CharacterDetail = styled.Text`
  font-size: 18px;
  margin-bottom: 5px;
  color: #70592d;
`;

const OpenLinkInBrowser: ListRenderItem<string> = ({item}) => {
  const handleOpenLink = () => {
    Linking.openURL(item).catch(err =>
      console.error('Failed to open link:', err),
    );
  };

  return (
    <Fragment>
      <TouchableOpacity onPress={handleOpenLink}>
        <CharacterDetail>{item}</CharacterDetail>
      </TouchableOpacity>
    </Fragment>
  );
};

export default OpenLinkInBrowser;
