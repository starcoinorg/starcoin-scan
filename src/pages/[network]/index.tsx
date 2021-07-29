import { Grid, GridItem, Button, Divider, Spinner, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import { AnimateSharedLayout, motion } from 'framer-motion'
import useNetwork from 'hooks/use-network'
import TransactionListItem from 'components/transaction-list-item'
import BlockListItem from 'components/block-list-item'
import EpochStat from 'components/epoch-stat'
import { CardWithHeader } from 'layouts/card-with-header'
import ListItemPlaceholder from 'components/list-item-placeholder'
import { API_PAGE_SIZE } from 'utils/constants'
import { useBlocksLatest, useTransactionsLatest } from 'hooks/use-api'

export default function Index() {
  const network = useNetwork()
  const { data: blocks } = useBlocksLatest({ refreshInterval: 2000 })
  const { data: transactions } = useTransactionsLatest({ refreshInterval: 2000 })
  const buttonBackground = useColorModeValue('white', undefined)

  return (
    <Grid
      templateColumns={{ base: 'minmax(0, 1fr)', xl: 'minmax(0, 1fr) minmax(0, 1fr)' }}
      gap={6}
      padding={6}
    >
      <EpochStat />
      <GridItem colSpan={1}>
        <CardWithHeader
          title="Latest blocks"
          subtitle={
            <Link href={`/${network}/blocks`} passHref={true}>
              <Button as="a" size="sm" bg={buttonBackground} mr={-4}>
                View all
              </Button>
            </Link>
          }
        >
          <AnimateSharedLayout>
            {blocks?.length ? (
              blocks.map((block, index) => (
                <motion.div layout={true} key={block._id}>
                  {index === 0 ? null : <Divider />}
                  <BlockListItem block={block._id} relativeTime={true} />
                </motion.div>
              ))
            ) : (
              <ListItemPlaceholder height={API_PAGE_SIZE * 68 - 1}>
                <Spinner />
              </ListItemPlaceholder>
            )}
          </AnimateSharedLayout>
        </CardWithHeader>
      </GridItem>
      <GridItem colSpan={1}>
        <CardWithHeader
          title="Latest transactions"
          subtitle={
            <Link href={`/${network}/txs`} passHref={true}>
              <Button as="a" size="sm" bg={buttonBackground} mr={-4}>
                View all
              </Button>
            </Link>
          }
        >
          <AnimateSharedLayout>
            {transactions?.length ? (
              transactions.map((transaction, index) => (
                <motion.div layout={true} key={transaction._id}>
                  {index === 0 ? null : <Divider />}
                  <TransactionListItem transaction={transaction._id} relativeTime={true} />
                </motion.div>
              ))
            ) : (
              <ListItemPlaceholder height={API_PAGE_SIZE * 68 - 1}>
                <Spinner />
              </ListItemPlaceholder>
            )}
          </AnimateSharedLayout>
        </CardWithHeader>
      </GridItem>
    </Grid>
  )
}
