import { useState } from "react";
import { Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { useNavigation } from "@react-navigation/native";
import { Background } from "../../components/Background";
import { styles } from "./styles";
export function Home() {
  const [games, setGames] = useState<GameCardProps[]>();
  const navigation = useNavigation();
  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    const data = { id: id, title: title, bannerUrl: bannerUrl };
    navigation.navigate("game", data);
  }
  useEffect(() => {
    fetch(`${process.env.API}/games`)
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);
  console.log(games);
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Econtre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        ></Heading>
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
