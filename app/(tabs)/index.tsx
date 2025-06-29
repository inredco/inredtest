import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { TrendingUp, Users, DollarSign, Activity, Bell, Search } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color, index }) => (
  <Animated.View 
    entering={FadeInDown.delay(index * 100).springify()}
    style={[styles.statCard, { borderLeftColor: color }]}
  >
    <View style={styles.statHeader}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        {icon}
      </View>
      <Text style={styles.statChange}>{change}</Text>
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </Animated.View>
);

export default function HomeScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      title: 'Total Revenue',
      value: '$124,592',
      change: '+12.5%',
      icon: <DollarSign size={20} color="#10b981" />,
      color: '#10b981',
    },
    {
      title: 'Active Users',
      value: '8,429',
      change: '+8.2%',
      icon: <Users size={20} color="#3b82f6" />,
      color: '#3b82f6',
    },
    {
      title: 'Growth Rate',
      value: '23.1%',
      change: '+2.4%',
      icon: <TrendingUp size={20} color="#f59e0b" />,
      color: '#f59e0b',
    },
    {
      title: 'Performance',
      value: '94.2%',
      change: '+1.8%',
      icon: <Activity size={20} color="#ef4444" />,
      color: '#ef4444',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.timeText}>
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Search size={20} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Bell size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatCard key={stat.title} {...stat} index={index} />
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInRight.delay(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.actionGradient}
              >
                <TrendingUp size={24} color="#ffffff" />
                <Text style={styles.actionText}>View Analytics</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <LinearGradient
                colors={['#f093fb', '#f5576c']}
                style={styles.actionGradient}
              >
                <Users size={24} color="#ffffff" />
                <Text style={styles.actionText}>Manage Users</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600)} style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <BlurView intensity={20} style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: '#10b981' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>New user registered</Text>
                <Text style={styles.activityTime}>2 minutes ago</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: '#3b82f6' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Payment processed</Text>
                <Text style={styles.activityTime}>5 minutes ago</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: '#f59e0b' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Report generated</Text>
                <Text style={styles.activityTime}>12 minutes ago</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Inter-Regular',
    opacity: 0.9,
  },
  userName: {
    fontSize: 24,
    color: '#ffffff',
    fontFamily: 'Inter-Bold',
    marginTop: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'Inter-Medium',
    opacity: 0.8,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    width: (width - 52) / 2,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statChange: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#10b981',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  actionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginTop: 8,
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
  },
  activityTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
});