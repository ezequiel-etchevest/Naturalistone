import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  HStack,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { BsCreditCardFill } from "react-icons/bs";
import { FaRegClipboard } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import PaymentsMadeModal from "./paymentsMadeModal";
import { BiTask } from "react-icons/bi";

function StatsCard(props) {
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const { title, stat, icon, visibility, info } = props;

  return (
    <>
      <Stat
        visibility={visibility}
        w={"10vw"}
        h={"16vh"}
        px={{ base: 2, md: 4 }}
        py={"5"}
        border={"1px solid"}
        borderColor={"web.border"}
        rounded={"md"}
        color={"web.text"}
        _hover={{
          bg: "logo.orange",
          color: "web.text",
          cursor: "pointer",
        }}
        onClick={onOpen1}
      >
        <Flex justifyContent={"space-between"}>
          <Box pl={{ base: 2, md: 6 }}>
            <StatLabel fontWeight={"medium"}>{title}</StatLabel>
            <StatNumber fontSize={"4xl"} fontWeight={"medium"}>
              {stat?.toLocaleString("en-US")}
            </StatNumber>
          </Box>
          <Box my={"auto"} color={"web.text"} alignContent={"center"}>
            {icon}
          </Box>
        </Flex>
      </Stat>
      {info ? (
        <PaymentsMadeModal isOpenModal={isOpen1} onCloseModal={onClose1} />
      ) : (
        <></>
      )}
    </>
  );
}

export default function PaymentsStats({ stats, filters }) {
  return (
    <Box h={"92vh"} px={"4vw"} bg={"web.bg"}>
      <HStack columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={"Payments"}
          stat={
            stats.TotalAmount === null
              ? 0
              : Number(stats.TotalAmount.toFixed(2))
          }
          icon={<MdOutlinePayments size={"3em"} />}
          info={true}
        />
        <StatsCard
          title={"Tasks Todo / Done"}
          stat={`${stats.tasks[0].total_todo} / ${stats.tasks[0].total_done}`}
          icon={<BiTask size={"3em"} />}
          info={false}
        />
        <StatsCard
          title={"Samples"}
          stat={stats.samples[0].total_samples}
          icon={<FaRegClipboard size={"3em"} />}
          info={false}
        />
      </HStack>
    </Box>
  );
}
