import React from 'react';
import { FlatList } from 'react-native';
import { FadeInView } from './FadeInView';

export const StaggeredList = ({ data, renderItem }: any) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <FadeInView delay={index * 100}>
          {renderItem({ item, index })}
        </FadeInView>
      )}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};
