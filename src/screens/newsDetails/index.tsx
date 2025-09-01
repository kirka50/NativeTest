import React from "react";
import styled from "styled-components/native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { Button, Linking } from "react-native";

type Article = {
    title: string;
    urlToImage: string | null;
    publishedAt: string;
    source: { name: string };
    author?: string;
    description?: string;
    url: string;
    content?: string;
};

export default function NewsDetails() {
    const route = useRoute<RouteProp<any>>();
    const navigation = useNavigation();
    const { article } = route.params as { article: Article };

    return (
        <Container>
            <NewsImage
                source={{
                    uri: article.urlToImage || "https://via.placeholder.com/300",
                }}
            />
            <Title>{article.title}</Title>
            <Meta>
                {article.author && <Author>Автор: {article.author}</Author>}
                <DateText>
                    {new Date(article.publishedAt).toLocaleDateString()}
                </DateText>
            </Meta>
            <Description>{article.content || article.description}</Description>
            {article.url && (
                <Button title="Открыть в браузере" onPress={() => Linking.openURL(article.url)} />
            )}
        </Container>
    );
}

const Container = styled.ScrollView`
  flex: 1;
  padding: 15px;
  background: #fff;
`;

const NewsImage = styled.Image`
  width: 100%;
  height: 200px;
  margin-bottom: 15px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Meta = styled.View`
  margin-bottom: 10px;
`;

const Author = styled.Text`
  font-size: 14px;
  font-style: italic;
`;

const DateText = styled.Text`
  font-size: 14px;
  color: gray;
`;

const Description = styled.Text`
  font-size: 16px;
  margin-bottom: 20px;
`;
