import React, { ReactNode, useCallback } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import {
  Flex,
  Spacer,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  Portal,
  useDisclosure,
  useColorMode,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { css } from '@emotion/react'
import { ChevronDownIcon, ChevronUpIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'

import { NETWORKS } from '../constants'
import { NetworkProvider } from '../contexts/network'

const networks = Object.values(NETWORKS)

export default function Layout(props: { children?: ReactNode }) {
  const history = useHistory()
  const params = useParams<{ network: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const handleSelect = useCallback(
    (item: string) => {
      history.push({
        ...history.location,
        pathname: history.location.pathname.replace(/^\/\w+/, `/${item}`),
      })
    },
    [history],
  )
  const buttonBackground = useColorModeValue('white', undefined)

  return (
    <NetworkProvider value={params.network}>
      <Flex
        height={16}
        paddingX={6}
        alignItems="center"
        bg={colorMode === 'light' ? 'gray.100' : 'gray.900'}
        zIndex={1}
        boxShadow="base"
        css={css`
          position: sticky;
          top: 0;
        `}
      >
        <Button
          as={Link}
          to={`/${params.network}`}
          bg={history.location.pathname === `/${params.network}` ? buttonBackground : undefined}
          variant={history.location.pathname === `/${params.network}` ? 'solid' : 'ghost'}
        >
          Home
        </Button>
        <Button
          as={Link}
          to={`/${params.network}/blocks`}
          bg={/\/blocks/.test(history.location.pathname) ? buttonBackground : undefined}
          variant={/\/blocks/.test(history.location.pathname) ? 'solid' : 'ghost'}
          ml={2}
        >
          Blocks
        </Button>
        <Button
          as={Link}
          to={`/${params.network}/txs`}
          bg={/\/txs/.test(history.location.pathname) ? buttonBackground : undefined}
          variant={/\/txs/.test(history.location.pathname) ? 'solid' : 'ghost'}
          ml={2}
        >
          Transactions
        </Button>
        <Spacer />
        <Menu isOpen={isOpen} onClose={onClose} autoSelect={false}>
          <MenuButton
            as={Button}
            bg={buttonBackground}
            rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={onOpen}
          >
            {params.network}
          </MenuButton>
          <Portal>
            <MenuList>
              {networks.map((network) => (
                <MenuItemOption
                  key={network}
                  onClick={() => handleSelect(network)}
                  isChecked={params.network === network}
                >
                  {network}
                </MenuItemOption>
              ))}
            </MenuList>
          </Portal>
        </Menu>
        <IconButton
          aria-label="toggle color mode"
          ml={4}
          bg={buttonBackground}
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        />
      </Flex>
      {props.children}
    </NetworkProvider>
  )
}