import "./hotel.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCrown,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { publicRequest } from "../../request";
import { useGlobalContext } from "../../context/useGlobalContext";
//components
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import Room from "../../components/room/Room";
import ListSearch from "../../components/listSearch/ListSearch";
//date picker
import { DateRange } from "react-date-range"; //date
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const Hotel = () => {
  const { getStar, dates, setDates } = useGlobalContext();
  const { id } = useParams();
  const [hotel, setHotel] = useState([]);
  const [service, setService] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [openDate, setOpenDate] = useState(false);

  const getHotel = async () => {
    try {
      const res = await publicRequest.get("/hotels/" + id);
      setHotel(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getService = async () => {
    try {
      const res = await publicRequest.get("/hotels/service/" + id);
      setService(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getRooms = async () => {
    try {
      const res = await publicRequest.get("/hotels/room/" + id);
      setRooms(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getService();
    getRooms();
    getHotel();
  }, []);

  return (
    <>
      <Navbar />
      <Header type="list" />
      {hotel ? (
        <div className="hotelContainer">
          <div className="hotelContent">
            <ListSearch />

            <div className="hotelWrapper">
              <button className="btnBookNow">?????t ngay</button>

              <div className="hotelStar">
                <span className="type">Kh??ch s???n</span>
                <span className="star">
                  {getStar(hotel.ChatLuong).map((i) => i)}
                </span>
              </div>
              <h1 className="hotelTitle">{hotel.TenKhachSan}</h1>
              <div className="hotelAddress">
                <span>
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                {hotel.DiaChi}
              </div>
              <span className="hotelDistance">
                V??? tr?? tuy???t v???i - Hi???n th??? tr??n b???n ?????
              </span>
              <div className="hotelImage">
                <img src={hotel.Anh} alt="" className="hotelImg" />
              </div>
            </div>
          </div>
          <div className="hotelDetails">
            <div className="hotelDesc">
              <p>{hotel.Mota}</p>
              <div className="hotelService">
                <h3>C??c ti???n nghi ???????c ??a chu???ng nh???t</h3>
                <div className="hotelServiceList">
                  {service.map((s) => (
                    <span className="item" key={s.MaDichVu}>
                      <span>
                        <FontAwesomeIcon icon={faCrown} />
                      </span>{" "}
                      {s.TenDichVu}
                    </span>
                  ))}
                </div>
                <p>
                  <b>D???ch v??? Thu ??????i Ngoa??i T????:</b> B???n c???n ti???n ?????a ph????ng? Ch???
                  ngh??? n??y c?? d???ch v??? Thu ??????i Ngoa??i T???? trong khu??n vi??n.
                </p>
              </div>
            </div>

            <div className="genius">
              <h1>L???i ??ch Genius c?? ??? m???t s??? l???a ch???n:</h1>
              <span>Gi???m gi?? 10% - ??p d???ng tr??n gi?? tr?????c thu??? v?? ph??</span>
            </div>
          </div>

          <div className="hotelRoom">
            <h2>Ph??ng tr???ng</h2>
            <div className="hotelRoomSearch">
              <div className="hotelRoomDate">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="hotelRoomText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} ?????n ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <button
                className="hotelRoomBtn"
                onClick={() => setOpenDate(!openDate)}
              >
                Ch???n
              </button>
            </div>
            <div className="hotelRoomTable">
              <table>
                <thead>
                  <tr>
                    <th>Lo???i ph??ng</th>
                    <th>Ph?? h???p cho</th>
                    <th>Gi?? ph??ng</th>
                    <th>C??n tr???ng</th>
                    <th>?????t</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((r) => (
                    <Room room={r} key={r.MaLoaiPhong} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
      {/* {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />} */}
      <MailList />
      <Footer />
    </>
  );
};

export default Hotel;
