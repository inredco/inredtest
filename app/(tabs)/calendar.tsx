import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Clock, MapPin, Users, X } from 'lucide-react-native';
import Animated, { FadeInDown, SlideInRight } from 'react-native-reanimated';

interface Event {
  id: string;
  title: string;
  time: string;
  location: string;
  attendees: number;
  color: string;
}

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('2025-01-15');
  const [showEventModal, setShowEventModal] = useState(false);

  const events: Event[] = [
    {
      id: '1',
      title: 'Team Meeting',
      time: '09:00 AM',
      location: 'Conference Room A',
      attendees: 8,
      color: '#6366f1',
    },
    {
      id: '2',
      title: 'Client Presentation',
      time: '02:00 PM',
      location: 'Virtual',
      attendees: 5,
      color: '#10b981',
    },
    {
      id: '3',
      title: 'Project Review',
      time: '04:30 PM',
      location: 'Office',
      attendees: 12,
      color: '#f59e0b',
    },
  ];

  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: '#6366f1',
    },
    '2025-01-16': {
      marked: true,
      dotColor: '#10b981',
    },
    '2025-01-18': {
      marked: true,
      dotColor: '#f59e0b',
    },
    '2025-01-20': {
      marked: true,
      dotColor: '#ef4444',
    },
  };

  const EventCard: React.FC<{ event: Event; index: number }> = ({ event, index }) => (
    <Animated.View entering={FadeInDown.delay(index * 100)} style={styles.eventCard}>
      <View style={[styles.eventColorBar, { backgroundColor: event.color }]} />
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View style={styles.eventDetails}>
          <View style={styles.eventDetail}>
            <Clock size={14} color="#6b7280" />
            <Text style={styles.eventDetailText}>{event.time}</Text>
          </View>
          <View style={styles.eventDetail}>
            <MapPin size={14} color="#6b7280" />
            <Text style={styles.eventDetailText}>{event.location}</Text>
          </View>
          <View style={styles.eventDetail}>
            <Users size={14} color="#6b7280" />
            <Text style={styles.eventDetailText}>{event.attendees} attendees</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowEventModal(true)}
        >
          <Plus size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(100)} style={styles.calendarContainer}>
          <Calendar
            current={selectedDate}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={markedDates}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#6b7280',
              selectedDayBackgroundColor: '#6366f1',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#6366f1',
              dayTextColor: '#1f2937',
              textDisabledColor: '#d1d5db',
              dotColor: '#6366f1',
              selectedDotColor: '#ffffff',
              arrowColor: '#6366f1',
              monthTextColor: '#1f2937',
              indicatorColor: '#6366f1',
              textDayFontFamily: 'Inter-Medium',
              textMonthFontFamily: 'Inter-Bold',
              textDayHeaderFontFamily: 'Inter-SemiBold',
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200)} style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>
            Events for {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
          
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400)} style={styles.upcomingSection}>
          <Text style={styles.sectionTitle}>Upcoming This Week</Text>
          <View style={styles.upcomingCard}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.upcomingGradient}
            >
              <Text style={styles.upcomingTitle}>Product Launch Meeting</Text>
              <Text style={styles.upcomingDate}>Tomorrow, 10:00 AM</Text>
              <Text style={styles.upcomingLocation}>Main Conference Room</Text>
            </LinearGradient>
          </View>
        </Animated.View>
      </ScrollView>

      <Modal
        visible={showEventModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowEventModal(false)}
      >
        <Animated.View entering={SlideInRight} style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>New Event</Text>
            <TouchableOpacity onPress={() => setShowEventModal(false)}>
              <X size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Event creation form would go here...</Text>
          </View>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  calendarContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  eventsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventColorBar: {
    width: 4,
  },
  eventContent: {
    flex: 1,
    padding: 16,
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 8,
  },
  eventDetails: {
    gap: 4,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventDetailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  upcomingSection: {
    marginBottom: 20,
  },
  upcomingCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  upcomingGradient: {
    padding: 20,
  },
  upcomingTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  upcomingDate: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 2,
  },
  upcomingLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
});