import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { useGame } from '../contexts/GameContext';
import BackgroundImage from '../components/BackgroundImage';

export default function FriendsScreen() {
  const { friends, playerProfile, dispatch } = useGame();
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'search'>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [friendCode, setFriendCode] = useState('');

  const handleAddFriend = () => {
    if (friendCode.trim()) {
      dispatch({ type: 'ADD_FRIEND', friendId: friendCode });
      setShowAddFriendModal(false);
      setFriendCode('');
      Alert.alert('FRIEND ADDED!', 'NEW FRIEND HAS BEEN ADDED TO YOUR LIST!');
    }
  };

  const handleRemoveFriend = (friendId: string) => {
    Alert.alert(
      'REMOVE FRIEND',
      'ARE YOU SURE YOU WANT TO REMOVE THIS FRIEND?',
      [
        { text: 'CANCEL', style: 'cancel' },
        { 
          text: 'REMOVE', 
          style: 'destructive',
          onPress: () => dispatch({ type: 'REMOVE_FRIEND', friendId })
        }
      ]
    );
  };

  const formatLastSeen = (lastSeen: Date) => {
    const now = new Date();
    const diff = now.getTime() - lastSeen.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'ONLINE NOW';
    if (minutes < 60) return `${minutes}M AGO`;
    if (hours < 24) return `${hours}H AGO`;
    return `${days}D AGO`;
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 10) return '👑';
    if (rank <= 50) return '🥇';
    if (rank <= 100) return '🥈';
    if (rank <= 500) return '🥉';
    return '⭐';
  };

  const getRankColor = (rank: number) => {
    if (rank <= 10) return '#FFD700';
    if (rank <= 50) return '#C0C0C0';
    if (rank <= 100) return '#CD7F32';
    return '#666666';
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BackgroundImage style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FRIENDS</Text>
          <View style={styles.friendStats}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{playerProfile.friendsCount}</Text>
              <Text style={styles.statLabel}>FRIENDS</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{friends.filter(f => f.isOnline).length}</Text>
              <Text style={styles.statLabel}>ONLINE</Text>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
            onPress={() => setActiveTab('friends')}
          >
            <Text style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>
              FRIENDS ({friends.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
            onPress={() => setActiveTab('requests')}
          >
            <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
              REQUESTS (0)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'search' && styles.activeTab]}
            onPress={() => setActiveTab('search')}
          >
            <Text style={[styles.tabText, activeTab === 'search' && styles.activeTabText]}>
              SEARCH
            </Text>
          </TouchableOpacity>
        </View>

        {/* Add Friend Button */}
        <TouchableOpacity
          style={styles.addFriendButton}
          onPress={() => setShowAddFriendModal(true)}
        >
          <Text style={styles.addFriendButtonText}>+ ADD FRIEND</Text>
        </TouchableOpacity>

        {/* Friends List */}
        {activeTab === 'friends' && (
          <View style={styles.friendsList}>
            {filteredFriends.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>👥</Text>
                <Text style={styles.emptyTitle}>NO FRIENDS YET</Text>
                <Text style={styles.emptyDescription}>
                  ADD FRIENDS TO COMPARE SCORES AND COMPETE TOGETHER!
                </Text>
              </View>
            ) : (
              filteredFriends.map((friend) => (
                <View key={friend.id} style={styles.friendCard}>
                  <View style={styles.friendInfo}>
                    <View style={styles.avatarContainer}>
                      <Text style={styles.avatar}>{friend.avatar}</Text>
                      {friend.isOnline && <View style={styles.onlineIndicator} />}
                    </View>
                    
                    <View style={styles.friendDetails}>
                      <View style={styles.friendHeader}>
                        <Text style={styles.friendName}>{friend.name}</Text>
                        <View style={[styles.rankBadge, { backgroundColor: getRankColor(friend.rank) }]}>
                          <Text style={styles.rankIcon}>{getRankIcon(friend.rank)}</Text>
                          <Text style={styles.rankText}>#{friend.rank}</Text>
                        </View>
                      </View>
                      
                      <View style={styles.friendStats}>
                        <View style={styles.friendStat}>
                          <Text style={styles.friendStatLabel}>LEVEL</Text>
                          <Text style={styles.friendStatValue}>{friend.level}</Text>
                        </View>
                        <View style={styles.friendStat}>
                          <Text style={styles.friendStatLabel}>HIGH SCORE</Text>
                          <Text style={styles.friendStatValue}>{friend.highScore.toLocaleString()}</Text>
                        </View>
                        <View style={styles.friendStat}>
                          <Text style={styles.friendStatLabel}>MUTUAL</Text>
                          <Text style={styles.friendStatValue}>{friend.mutualFriends}</Text>
                        </View>
                      </View>
                      
                      <Text style={styles.lastSeen}>
                        {friend.isOnline ? 'ONLINE NOW' : `LAST SEEN ${formatLastSeen(friend.lastSeen)}`}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.friendActions}>
                    <TouchableOpacity style={styles.challengeButton}>
                      <Text style={styles.challengeButtonText}>CHALLENGE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => handleRemoveFriend(friend.id)}
                    >
                      <Text style={styles.removeButtonText}>REMOVE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        {/* Friend Requests */}
        {activeTab === 'requests' && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📨</Text>
            <Text style={styles.emptyTitle}>NO REQUESTS</Text>
            <Text style={styles.emptyDescription}>
              FRIEND REQUESTS WILL APPEAR HERE WHEN YOU RECEIVE THEM.
            </Text>
          </View>
        )}

        {/* Search Friends */}
        {activeTab === 'search' && (
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="SEARCH BY NAME OR FRIEND CODE..."
                placeholderTextColor="#666666"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            
            <View style={styles.searchResults}>
              <Text style={styles.searchHint}>
                ENTER A FRIEND CODE TO ADD NEW FRIENDS
              </Text>
            </View>
          </View>
        )}

        {/* Leaderboard Section */}
        <View style={styles.leaderboardSection}>
          <Text style={styles.leaderboardTitle}>FRIENDS LEADERBOARD</Text>
          
          {friends
            .sort((a, b) => b.highScore - a.highScore)
            .slice(0, 5)
            .map((friend, index) => (
              <View key={friend.id} style={styles.leaderboardItem}>
                <View style={styles.rankContainer}>
                  <Text style={styles.rankNumber}>#{index + 1}</Text>
                </View>
                <Text style={styles.leaderboardAvatar}>{friend.avatar}</Text>
                <View style={styles.leaderboardInfo}>
                  <Text style={styles.leaderboardName}>{friend.name}</Text>
                  <Text style={styles.leaderboardScore}>{friend.highScore.toLocaleString()} POINTS</Text>
                </View>
                <View style={styles.leaderboardLevel}>
                  <Text style={styles.leaderboardLevelText}>LVL {friend.level}</Text>
                </View>
              </View>
            ))}
        </View>

        {/* Add Friend Modal */}
        <Modal
          visible={showAddFriendModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowAddFriendModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>ADD FRIEND</Text>
              
              <Text style={styles.modalDescription}>
                ENTER YOUR FRIEND'S CODE TO ADD THEM TO YOUR FRIENDS LIST
              </Text>
              
              <TextInput
                style={styles.modalInput}
                placeholder="FRIEND CODE"
                placeholderTextColor="#666666"
                value={friendCode}
                onChangeText={setFriendCode}
                autoCapitalize="characters"
              />
              
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => setShowAddFriendModal(false)}
                >
                  <Text style={styles.modalCancelText}>CANCEL</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.modalAddButton}
                  onPress={handleAddFriend}
                >
                  <Text style={styles.modalAddText}>ADD FRIEND</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 140,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#380082',
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 20,
  },
  friendStats: {
    flexDirection: 'row',
    gap: 20,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#380082',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFD700',
    minWidth: 100,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 5,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFD700',
  },
  tabText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#380082',
  },
  addFriendButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#45A049',
  },
  addFriendButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  friendsList: {
    marginBottom: 30,
  },
  emptyState: {
    alignItems: 'center',
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 40,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 20,
  },
  friendCard: {
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  friendInfo: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    fontSize: 40,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  friendDetails: {
    flex: 1,
  },
  friendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rankIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  rankText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  friendStats: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 8,
  },
  friendStat: {
    alignItems: 'center',
  },
  friendStatLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.7,
  },
  friendStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  lastSeen: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
  },
  friendActions: {
    flexDirection: 'row',
    gap: 10,
  },
  challengeButton: {
    flex: 1,
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  challengeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#380082',
  },
  removeButton: {
    flex: 1,
    backgroundColor: '#F44336',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchSection: {
    marginBottom: 30,
  },
  searchContainer: {
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#380082',
  },
  searchResults: {
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  searchHint: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.7,
  },
  leaderboardSection: {
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  rankContainer: {
    width: 30,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  leaderboardAvatar: {
    fontSize: 24,
    marginHorizontal: 15,
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  leaderboardScore: {
    fontSize: 12,
    color: '#FFD700',
  },
  leaderboardLevel: {
    alignItems: 'center',
  },
  leaderboardLevelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#380082',
    borderRadius: 20,
    padding: 30,
    width: '90%',
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  modalInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#380082',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 15,
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#666666',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalAddButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalAddText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
