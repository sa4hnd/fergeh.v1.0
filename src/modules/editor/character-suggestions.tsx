import {
  Box,
  Button,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconArrowBarUp, IconLanguage } from "@tabler/icons-react";
import { motion } from "framer-motion";
import React from "react";
import {
  getSuggestions,
  languageName,
  type Language,
} from "../../lib/language";

interface CharacterSuggestionsProps {
  language: Language;
  focused: boolean;
  onSelect: (c: string) => void;
  onLanguageClick: () => void;
}

export const CharacterSuggestions: React.FC<CharacterSuggestionsProps> = ({
  language,
  focused,
  onSelect,
  onLanguageClick,
}) => {
  const characters = getSuggestions(language);
  const [uppercased, setUppercased] = React.useState(false);
  const text = useColorModeValue("gray.900", "whiteAlpha.900");

  const bg = useColorModeValue("gray.50", "gray.800");

  if (!focused || !characters.length) return null;

  return (
    <Box pos="absolute" top="calc(100% + 1px)" w="full" zIndex="20">
      <motion.div initial={{ y: -10 }} animate={{ y: 0 }}>
        <Box
          bg={bg}
          roundedBottom="lg"
          shadow="xl"
          p="4"
          onMouseDown={(e) => e.preventDefault()}
        >
          <Stack spacing={4}>
            <Box>
              {characters.map((c, i) => (
                <Button
                  key={i}
                  display="inline-block"
                  size="sm"
                  variant="outline"
                  m="1"
                  colorScheme="blue"
                  onClick={() =>
                    onSelect(uppercased ? c.toLocaleUpperCase() : c)
                  }
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <Text color={text}>
                    {uppercased ? c.toLocaleUpperCase() : c}
                  </Text>
                </Button>
              ))}
              <IconButton
                size="sm"
                m="1"
                variant="outline"
                colorScheme="gray"
                icon={<IconArrowBarUp size={18} />}
                aria-label="Toggle uppercase"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setUppercased(!uppercased);
                }}
              />
            </Box>
            <Button
              size="sm"
              w="max"
              variant="solid"
              leftIcon={<IconLanguage size={18} />}
              onClick={onLanguageClick}
            >
              {languageName(language)}
            </Button>
          </Stack>
        </Box>
      </motion.div>
    </Box>
  );
};

export const CharacterSuggestionsPure = React.memo(CharacterSuggestions);
