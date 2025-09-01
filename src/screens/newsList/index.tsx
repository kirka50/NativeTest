import React, { useState } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { useNews } from "../../hooks/useNews";

export default function NewsList() {
    const navigation = useNavigation<any>();
    const {
        articles,
        loading,
        refreshing,
        error,
        hasMore,
        fetchNews,
        refresh,
        setQuery,
        setCategory,
    } = useNews();

    // локальное состояние для ввода
    const [searchText, setSearchText] = useState("");

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate("NewsDetails", { article: item })}
        >
            <Card>
                <NewsImage
                    source={{
                        uri: item.urlToImage || "https://via.placeholder.com/150",
                    }}
                />
                <Info>
                    <Title numberOfLines={2}>{item.title}</Title>
                    <Source>{item.source.name}</Source>
                    <DateText>{new Date(item.publishedAt).toLocaleDateString()}</DateText>
                </Info>
            </Card>
        </TouchableOpacity>
    );

    return (
        <Container>
            {/* Поиск */}
            <SearchRow>
                <SearchInput
                    placeholder="Поиск..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <SearchButton onPress={() => setQuery(searchText)}>
                    <SearchButtonText>Поиск</SearchButtonText>
                </SearchButton>
            </SearchRow>

            {/* Фильтры */}
            <Filters>
                {["technology", "sports", "politics"].map(cat => (
                    <FilterButton key={cat} onPress={() => setCategory(cat)}>
                        <FilterText>{cat}</FilterText>
                    </FilterButton>
                ))}
                <FilterButton onPress={() => setCategory(undefined)}>
                    <FilterText>Все</FilterText>
                </FilterButton>
            </Filters>

            {/* Новости */}
            {loading && articles.length === 0 ? (
                <ActivityIndicator size="large" />
            ) : error ? (
                <ErrorText>{error}</ErrorText>
            ) : (
                <FlatList
                    data={articles}
                    keyExtractor={(_, i) => i.toString()}
                    renderItem={renderItem}
                    onEndReached={() => hasMore && fetchNews()}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        loading ? <ActivityIndicator style={{ margin: 10 }} /> : null
                    }
                    refreshing={refreshing}
                    onRefresh={refresh}
                />
            )}
        </Container>
    );
}

// styled-components
const Container = styled.View`
    flex: 1;
    background: #fff;
`;

const Card = styled.View`
    flex-direction: row;
    margin: 10px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    elevation: 2;
`;

const NewsImage = styled.Image`
    width: 100px;
    height: 100px;
`;

const Info = styled.View`
    flex: 1;
    padding: 10px;
`;

const Title = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const Source = styled.Text`
    font-size: 12px;
    color: gray;
`;

const DateText = styled.Text`
    font-size: 12px;
    color: #666;
`;

const ErrorText = styled.Text`
    text-align: center;
    margin-top: 20px;
    color: red;
`;

const SearchRow = styled.View`
    flex-direction: row;
    margin: 10px;
`;

const SearchInput = styled.TextInput`
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const SearchButton = styled.TouchableOpacity`
  margin-left: 8px;
  background: #007bff;
  padding: 10px 14px;
  border-radius: 8px;
`;

const SearchButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const Filters = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const FilterButton = styled.TouchableOpacity`
  padding: 8px 12px;
  background: #eee;
  border-radius: 8px;
`;

const FilterText = styled.Text`
  font-size: 14px;
`;
