import { ScrollView, Text, View, Pressable, TextInput, TouchableOpacity, Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { registrationsAPI } from "@/lib/supabase";
import { useState } from "react";

export default function RegistrationScreen() {
  const { t } = useTranslation();
  const colors = useColors();
  const router = useRouter();

  // Parent Information
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentTelegram, setParentTelegram] = useState("");

  // Student Information
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const programs = [
    "Stage 1: Education (4-9 yrs)",
    "Stage 2: Foundation (10-12 yrs)",
    "Stage 3: Training (13-15 yrs)",
    "Stage 4: Post-training (16-18 yrs)",
  ];

  const handleSubmit = async () => {
    if (!parentName || !parentEmail || !parentPhone || !studentName || !studentAge || !selectedProgram) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await registrationsAPI.create({
        parent_name: parentName,
        parent_email: parentEmail,
        parent_phone: parentPhone,
        parent_telegram: parentTelegram || undefined,
        student_name: studentName,
        student_age: parseInt(studentAge),
        program: selectedProgram,
        additional_notes: additionalNotes || undefined,
      });

      Alert.alert(
        "Success",
        "Registration submitted! We will contact you soon.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to submit registration. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View className="flex-row items-center gap-3 pt-4 px-4">
            <Pressable onPress={() => router.back()}>
              <Text className="text-2xl">←</Text>
            </Pressable>
            <Text className="text-3xl font-bold text-foreground flex-1">
              {t("registration.title")}
            </Text>
          </View>

          {/* Subtitle */}
          <View className="px-4">
            <Text className="text-sm text-muted text-center">
              {t("registration.subtitle")}
            </Text>
          </View>

          {/* Parent Information Section */}
          <View className="px-4 gap-4">
            <Text className="text-lg font-bold text-foreground">
              {t("registration.parentInfo")}
            </Text>

            {/* Parent Name */}
            <View className="gap-2">
              <Text className="text-sm text-muted font-semibold">
                {t("registration.parentName")} *
              </Text>
              <TextInput
                placeholder="Enter your full name"
                placeholderTextColor={colors.muted}
                value={parentName}
                onChangeText={setParentName}
                editable={!isSubmitting}
                className="rounded-lg px-4 py-3 border text-foreground"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                  color: colors.foreground,
                }}
              />
            </View>

            {/* Email */}
            <View className="gap-2">
              <Text className="text-sm text-muted font-semibold">
                {t("registration.email")} *
              </Text>
              <TextInput
                placeholder="your.email@example.com"
                placeholderTextColor={colors.muted}
                value={parentEmail}
                onChangeText={setParentEmail}
                keyboardType="email-address"
                editable={!isSubmitting}
                className="rounded-lg px-4 py-3 border text-foreground"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                  color: colors.foreground,
                }}
              />
            </View>

            {/* Phone */}
            <View className="gap-2">
              <Text className="text-sm text-muted font-semibold">
                {t("registration.phone")} *
              </Text>
              <TextInput
                placeholder="+855 12 345 678"
                placeholderTextColor={colors.muted}
                value={parentPhone}
                onChangeText={setParentPhone}
                keyboardType="phone-pad"
                editable={!isSubmitting}
                className="rounded-lg px-4 py-3 border text-foreground"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                  color: colors.foreground,
                }}
              />
            </View>

            {/* Telegram */}
            <View className="gap-2">
              <Text className="text-sm text-muted font-semibold">
                {t("registration.telegram")}
              </Text>
              <TextInput
                placeholder="@username or phone"
                placeholderTextColor={colors.muted}
                value={parentTelegram}
                onChangeText={setParentTelegram}
                editable={!isSubmitting}
                className="rounded-lg px-4 py-3 border text-foreground"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                  color: colors.foreground,
                }}
              />
            </View>
          </View>

          {/* Student Information Section */}
          <View className="px-4 gap-4">
            <Text className="text-lg font-bold text-foreground">
              {t("registration.studentInfo")}
            </Text>

            {/* Student Name */}
            <View className="gap-2">
              <Text className="text-sm text-muted font-semibold">
                {t("registration.studentName")} *
              </Text>
              <TextInput
                placeholder="Enter student full name"
                placeholderTextColor={colors.muted}
                value={studentName}
                onChangeText={setStudentName}
                editable={!isSubmitting}
                className="rounded-lg px-4 py-3 border text-foreground"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                  color: colors.foreground,
                }}
              />
            </View>

            {/* Student Age */}
            <View className="gap-2">
              <Text className="text-sm text-muted font-semibold">
                {t("registration.studentAge")} *
              </Text>
              <TextInput
                placeholder="Enter age (4-18)"
                placeholderTextColor={colors.muted}
                value={studentAge}
                onChangeText={setStudentAge}
                keyboardType="number-pad"
                editable={!isSubmitting}
                className="rounded-lg px-4 py-3 border text-foreground"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                  color: colors.foreground,
                }}
              />
            </View>

            {/* Program Selection */}
            <View className="gap-2">
              <Text className="text-sm text-muted font-semibold">
                {t("registration.program")} *
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
              >
                {programs.map((program, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setSelectedProgram(program)}
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-full border"
                    style={{
                      backgroundColor:
                        selectedProgram === program ? colors.primary : colors.surface,
                      borderColor:
                        selectedProgram === program ? colors.primary : colors.border,
                      opacity: isSubmitting ? 0.5 : 1,
                    }}
                  >
                    <Text
                      className="text-sm font-semibold"
                      style={{
                        color:
                          selectedProgram === program ? colors.background : colors.foreground,
                      }}
                    >
                      {program.split(":")[0]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Additional Notes */}
            <View className="gap-2">
              <Text className="text-sm text-muted font-semibold">
                {t("registration.additionalNotes")}
              </Text>
              <TextInput
                placeholder="Any special requirements or questions?"
                placeholderTextColor={colors.muted}
                value={additionalNotes}
                onChangeText={setAdditionalNotes}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!isSubmitting}
                className="rounded-lg px-4 py-3 border text-foreground"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                  color: colors.foreground,
                }}
              />
            </View>
          </View>

          {/* Submit Button */}
          <View className="px-4 gap-3">
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isSubmitting}
              className="rounded-lg py-4 px-4 items-center"
              style={{
                backgroundColor: colors.primary,
                opacity: isSubmitting ? 0.6 : 1,
              }}
              activeOpacity={0.8}
            >
              <Text className="text-base font-bold text-background">
                {isSubmitting ? "Submitting..." : t("registration.submit")}
              </Text>
            </TouchableOpacity>

            <Text className="text-xs text-muted text-center">
              * Required fields
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
