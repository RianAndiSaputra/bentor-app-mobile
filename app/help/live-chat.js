import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const LiveChatScreen = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [agentTyping, setAgentTyping] = useState(false);
  const scrollViewRef = useRef();

  const csAgents = [
    {
      id: 1,
      name: 'Dewi CS',
      avatar: require('../../assets/images/becak.png'),
      status: 'Online'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simulate agent reply
    setTimeout(() => {
      setAgentTyping(true);
      setTimeout(() => {
        const agentReply = {
          id: Date.now() + 1,
          text: 'Terima kasih atas pesan Anda. Kami akan segera membantu Anda.',
          sender: 'agent',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentReply]);
        setAgentTyping(false);
      }, 2000);
    }, 1000);
  };

  useEffect(() => {
    // Initial greeting message
    const greeting = {
      id: 1,
      text: 'Halo! Saya Dewi dari CS Becak Royal. Ada yang bisa saya bantu?',
      sender: 'agent',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([greeting]);
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, agentTyping]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F3222" />
      
      {/* Header */}
      <LinearGradient
        colors={['#0F3222', '#1A4D2E']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.agentInfo}>
          <Image source={csAgents[0].avatar} style={styles.agentAvatar} />
          <View style={styles.agentText}>
            <Text style={styles.agentName}>{csAgents[0].name}</Text>
            <View style={styles.agentStatus}>
              <View style={[styles.statusIndicator, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.statusText}>{csAgents[0].status}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#FFF" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Chat Content */}
      <ScrollView 
        style={styles.chatContainer}
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContent}
      >
        {messages.map((msg) => (
          <View 
            key={msg.id} 
            style={[
              styles.messageBubble,
              msg.sender === 'user' ? styles.userBubble : styles.agentBubble
            ]}
          >
            {msg.sender === 'agent' && (
              <Image source={csAgents[0].avatar} style={styles.messageAvatar} />
            )}
            <View style={[
              styles.messageContent,
              msg.sender === 'user' ? styles.userContent : styles.agentContent
            ]}>
              <Text style={styles.messageText}>{msg.text}</Text>
              <Text style={styles.messageTime}>{msg.time}</Text>
            </View>
          </View>
        ))}
        
        {agentTyping && (
          <View style={[styles.messageBubble, styles.agentBubble]}>
            <Image source={csAgents[0].avatar} style={styles.messageAvatar} />
            <View style={[styles.messageContent, styles.agentContent]}>
              <View style={styles.typingIndicator}>
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TouchableOpacity style={styles.attachmentButton}>
          <Ionicons name="attach" size={24} color="#0F3222" />
        </TouchableOpacity>
        <TextInput
          style={styles.messageInput}
          placeholder="Ketik pesan..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSendMessage}
          disabled={message.trim() === ''}
        >
          <LinearGradient
            colors={message.trim() === '' ? ['#E0E0E0', '#E0E0E0'] : ['#0F3222', '#1A4D2E']}
            style={styles.sendButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={message.trim() === '' ? "#999" : "#FFF"} 
            />
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  header: {
    paddingTop: StatusBar.currentHeight + 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10
  },
  backButton: {
    padding: 5
  },
  agentInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15
  },
  agentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#B1944D'
  },
  agentText: {
    marginLeft: 10
  },
  agentName: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold'
  },
  agentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5
  },
  statusText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontFamily: 'Poppins-Regular'
  },
  moreButton: {
    padding: 5
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20
  },
  chatContent: {
    paddingBottom: 20
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 15,
    maxWidth: '80%'
  },
  userBubble: {
    alignSelf: 'flex-end'
  },
  agentBubble: {
    alignSelf: 'flex-start'
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    alignSelf: 'flex-end'
  },
  messageContent: {
    borderRadius: 15,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  userContent: {
    backgroundColor: '#0F3222',
    borderBottomRightRadius: 5
  },
  agentContent: {
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 5
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FFF'
  },
  userContentText: {
    color: '#FFF'
  },
  agentContentText: {
    color: '#333'
  },
  messageTime: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 5,
    alignSelf: 'flex-end'
  },
  agentTime: {
    color: '#999'
  },
  typingIndicator: {
    flexDirection: 'row',
    padding: 10
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B1944D',
    marginHorizontal: 2
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE'
  },
  attachmentButton: {
    padding: 8,
    marginRight: 10
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 120,
    fontFamily: 'Poppins-Regular',
    fontSize: 14
  },
  sendButton: {
    marginLeft: 10
  },
  sendButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LiveChatScreen;