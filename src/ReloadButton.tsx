import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ReloadButtonProps {
  onPress: () => void;
}

export const ReloadButton = ({ onPress }: ReloadButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.reloadButton}>
      <Text style={styles.reloadButtonText}>Reload ⤾</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  reloadButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  reloadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
