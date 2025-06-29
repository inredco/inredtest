import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown, Calendar, Filter } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const chartWidth = width - 40;

export default function AnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
        color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const pieData = [
    {
      name: 'Mobile',
      population: 45,
      color: '#6366f1',
      legendFontColor: '#374151',
      legendFontSize: 14,
    },
    {
      name: 'Desktop',
      population: 35,
      color: '#10b981',
      legendFontColor: '#374151',
      legendFontSize: 14,
    },
    {
      name: 'Tablet',
      population: 20,
      color: '#f59e0b',
      legendFontColor: '#374151',
      legendFontSize: 14,
    },
  ];

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#6366f1',
    },
  };

  const periods = [
    { label: '7D', value: '7d' },
    { label: '30D', value: '30d' },
    { label: '90D', value: '90d' },
    { label: '1Y', value: '1y' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#6366f1" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(100)} style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.value}
              style={[
                styles.periodButton,
                selectedPeriod === period.value && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period.value)}
            >
              <Text
                style={[
                  styles.periodText,
                  selectedPeriod === period.value && styles.periodTextActive,
                ]}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200)} style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <TrendingUp size={20} color="#10b981" />
              <Text style={styles.metricChange}>+12.5%</Text>
            </View>
            <Text style={styles.metricValue}>$24,592</Text>
            <Text style={styles.metricLabel}>Revenue</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <TrendingDown size={20} color="#ef4444" />
              <Text style={[styles.metricChange, { color: '#ef4444' }]}>-3.2%</Text>
            </View>
            <Text style={styles.metricValue}>1,429</Text>
            <Text style={styles.metricLabel}>Bounce Rate</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300)} style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Revenue Trend</Text>
          <LineChart
            data={lineData}
            width={chartWidth}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400)} style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Monthly Performance</Text>
          <BarChart
            data={barData}
            width={chartWidth}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500)} style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Device Distribution</Text>
          <PieChart
            data={pieData}
            width={chartWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600)} style={styles.insightsContainer}>
          <Text style={styles.chartTitle}>Key Insights</Text>
          <View style={styles.insightCard}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.insightGradient}
            >
              <Text style={styles.insightText}>
                Revenue increased by 12.5% compared to last week, driven primarily by mobile users.
              </Text>
            </LinearGradient>
          </View>
          
          <View style={styles.insightCard}>
            <LinearGradient
              colors={['#f093fb', '#f5576c']}
              style={styles.insightGradient}
            >
              <Text style={styles.insightText}>
                Mobile traffic accounts for 45% of total visits, showing strong mobile engagement.
              </Text>
            </LinearGradient>
          </View>
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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: '#6366f1',
  },
  periodText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  periodTextActive: {
    color: '#ffffff',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricChange: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#10b981',
  },
  metricValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  chartContainer: {
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
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
  },
  insightsContainer: {
    marginBottom: 20,
  },
  insightCard: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  insightGradient: {
    padding: 16,
  },
  insightText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    lineHeight: 20,
  },
});