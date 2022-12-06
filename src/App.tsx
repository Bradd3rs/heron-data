import {
  Button,
  Heading,
  Image,
  Input,
  Flex,
  Link,
  Text,
  useToast,
  Divider,
  Box,
  ListItem,
  List,
} from '@chakra-ui/react';
import { useState } from 'react';
import { postTransaction } from './api/heronApi';
import Header from './components/Header';
import { v4 as uuidv4 } from 'uuid';

import type { Transaction } from './types';

const App = () => {
  const [input, setInput] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const toast = useToast();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const enrichTransaction = async () => {
    try {
      const response = await postTransaction(input);
      if (response.data.merchant.name) {
        setTransactions([response.data, ...transactions]);
      } else {
        toast({
          title: 'No results found',
          description: 'Please check your transaction and try again',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: "We're sorry, something went wrong",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setInput('');
    }
  };

  return (
    <Box margin="0 auto" maxWidth="800px">
      <Header />
      <Flex width="20rem" marginBottom="2rem">
        <Input
          marginRight="1rem"
          onChange={(e) => handleOnChange(e)}
          value={input}
          placeholder="Paste your transaction here"
        />
        <Button disabled={!input} onClick={enrichTransaction}>
          Enrich
        </Button>
      </Flex>
      <List>
        {transactions.map((transaction) => (
          <ListItem key={uuidv4()}>
            <Flex marginBottom="1rem">
              <Image
                boxSize="100px"
                objectFit="cover"
                src={transaction.merchant.icon_url}
                alt={transaction.merchant.name}
              />
              <Flex marginLeft="1rem" flexDirection="column">
                <Heading size="sm">{transaction.merchant.name}</Heading>
                <Link href={transaction.merchant.url} isExternal>
                  {transaction.merchant.url}
                </Link>
                <Text>
                  MCC: {transaction.merchant.categories[0].code}{' '}
                  {transaction.merchant.categories[0].description}
                </Text>
                {transaction.payment_processor?.heron_id && (
                  <>
                    <Text>
                      Payment Processor: {transaction.payment_processor.name}
                    </Text>
                    <Link href={transaction.payment_processor.url} isExternal>
                      {transaction.payment_processor.url}
                    </Link>
                  </>
                )}
              </Flex>
            </Flex>
            <Divider marginBottom="1rem" />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default App;
