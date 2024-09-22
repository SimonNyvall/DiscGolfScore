import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Game, Player } from '@/data/model';

const initialGame: Game = { // Mock input
  course: {
    name: 'Example course',
    holes: Array(18).fill({ par: 3 }),
  },
  players: [
    { firstName: 'John', lastName: 'Doe', scores: Array(18).fill(0) },
    { firstName: 'Jane', lastName: undefined, scores: Array(18).fill(0) },
    { firstName: 'Bob', lastName: 'Smith', scores: Array(18).fill(0) },
    { firstName: 'Alice', lastName: undefined, scores: Array(18).fill(0) },
  ],
};

export default function HomeScreen() {
  const [currentHole, setCurrentHole] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [game, setGame] = useState<Game>(initialGame);
  const [scoreInput, setScoreInput] = useState<string>('');

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
    setScoreInput('');
  };

  const handleScoreUpdate = () => {
    const score = parseInt(scoreInput);
    if (selectedPlayer && !isNaN(score)) {
      const updatedPlayers = game.players.map((player) =>
        player.firstName === selectedPlayer.firstName
          ? {
            ...player,
            scores: player.scores.map((s, index) => (index === currentHole ? score : s)),
          }
          : player
      );
      setGame({ ...game, players: updatedPlayers });
      setSelectedPlayer(null);
      setSelectedPlayer(selectedPlayer);
      setScoreInput('');
    }
  };

  const nextHole = () => {
    if (currentHole < game.course.holes.length - 1) {
      setCurrentHole(currentHole + 1);
    }
  };

  const prevHole = () => {
    if (currentHole > 0) {
      setCurrentHole(currentHole - 1);
    }
  };

  const getPlayerName = (player: Player): string => {
    if (player.lastName) {
      return `${player.firstName.charAt(0).toUpperCase()}.${player.lastName.charAt(0).toUpperCase()}`;
    }

    return `${player.firstName.charAt(0).toUpperCase()}${player.firstName.charAt(1)}`;
  }

  const totalScore = (player: Player): number => {
    return player.scores.reduce((acc, score) => acc + score, 0);
  }

  type CrownRank = 0 | 1 | 2 | 3;

  interface CrownImages {
    [key: number]: any;
  }

  const crownImages: CrownImages = {
    0: require('@/assets/images/crown1.png'),
    1: require('@/assets/images/crown2.png'),
    2: require('@/assets/images/crown3.png'),
    3: require('@/assets/images/crown4.png'),
  };

  const getCrownRank = (players: Player[], player: Player): number => {
    const sortedPlayers = players.sort((a, b) => totalScore(a) - totalScore(b));
    return sortedPlayers.findIndex((p) => p.firstName === player.firstName);
  };


  return (
    <View style={styles.container}>
      {/* Player Selection */}
      <View style={styles.topView}>
        <View style={styles.playerContainer}>
          {game.players.map((player) => {
            const playerRank = getCrownRank(game.players, player);
            const crownImage = crownImages[playerRank]; // Get the crown image

            // Determine if the player is selected
            const isSelected = selectedPlayer?.firstName === player.firstName;

            return (
              <TouchableOpacity
                key={player.firstName}
                onPress={() => handlePlayerClick(player)}
                style={[styles.playerButton, isSelected && styles.selectedPlayerButton]} // Apply selected style conditionally
              >
                {crownImage && (
                  <Image
                    source={crownImage} // Use the static require
                    style={styles.crownImage} // Add appropriate styling
                  />
                )}
                <Text style={styles.playerText}>{getPlayerName(player)}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Display hole */}
      <Text style={styles.holeText}>Hole {currentHole + 1} ⛳</Text>

      {/* Display selected player and input score */}
      {selectedPlayer && (
        <View style={styles.scoreContainer}>
          <Text style={styles.whiteText}>Selected Player: {selectedPlayer.firstName}</Text>
          <Text style={styles.whiteText}>Score: {selectedPlayer.scores[currentHole]}</Text>

          {/* View total player score */}
          <Text style={styles.whiteText}>Total score: {totalScore(selectedPlayer)}</Text>

          {/* Input and OK Button */}
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter Score"
            value={scoreInput}
            onChangeText={(text) => setScoreInput(text)}
          />
          <Button title="OK" onPress={handleScoreUpdate} />
        </View>
      )}

      {/* Hole Navigation */}
      <View style={styles.navigationContainer}>
        <Button title="Previous Hole" onPress={prevHole} disabled={currentHole === 0} />
        <Button title="Next Hole" onPress={nextHole} disabled={currentHole === game.course.holes.length - 1} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24282a',
  },
  topView: {
    backgroundColor: '#151718',
    height: 120,
    width: '100%',
    position: 'relative',
    marginBottom: 20,
  },
  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#151718',
    position: 'absolute',
    bottom: 0,
    right: 50,
    transform: [{ translateX: 30 }],
    paddingBottom: 10,
  },
  playerButton: {
    padding: 10,
    backgroundColor: '#151718',
    borderRadius: 5,
    paddingRight: 29,
    paddingLeft: 29,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    width: '50%',
    marginTop: 10,
    marginBottom: 10,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  whiteText: {
    color: 'white',
  },
  crownImage: {
    width: 30,
    height: 20,
    marginBottom: 5
  },
  playerText: {
    textAlign: 'center',
    color: 'white',
  },
  selectedPlayerButton: {
    backgroundColor: '#313638',
  },
  holeText: {
    color: 'white',
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
});
